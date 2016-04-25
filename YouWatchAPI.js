"use strict";

var YouWatchAPI = {    
    AccountInfo: function(values, callback){
        var self = this;
        
        var hash = {
            op: 'account_info',
            key: values.key
        };
        
        self.Request(hash, callback);
    },
    
    UploadURL: function(values, callback){
        var self = this;
        
        var hash = [];
        hash['op'] = 'upload_url';
        hash['key'] = values.key;
        hash['url'] = values.url;
        if (values.folder) {
            hash['folder'] = values.folder;
        }
        
        self.Request(hash, callback);
    },
    
    CheckUploadURL: function(values, callback){
        var self = this;
        
        var hash = {
            op: 'check_upload_url',
            key: values.key,
            id: values.id
        };
        
        self.Request(hash, callback);
    },
    
    GetUploadServer: function(values, callback){
        var self = this;
        
        var hash = {
            op: 'get_upload_server',
            key: values.key
        };
        
        self.Request(hash, callback);
    },
    
    CheckFiles: function(values, callback){
        var self = this;
        
        var hash = [];
        hash['op'] = 'check_files';
        hash['key'] = values.key;
        
        if (typeof values.files === 'string') {
            hash['list'] = values.files;
        }else{
            var list = null;
            for(var row in values.files){
                if (list) {
                    list += ',' + values.files[row];
                }else{
                    list = values.files[row];
                }
            }
            hash['list'] = list;
        }
        
        self.Request(hash, callback);
    },
    
    RenewFile: function(values, callback){
        var self = this;
        
        var hash = {
            op: 'file_renew',
            key: values.key,
            file_code: values.file_code
        };
        
        self.Request(hash, callback);
    },
    
    CloneFile: function(values, callback){
        var self = this;
        
        var hash = [];
        hash['op'] = 'file_clone';
        hash['key'] = values.key;
        if (values.folder) {
            hash['folder'] = values.folder;
        }
        if (values.new_title) {
            hash['new_title'] = values.new_title;
        }
        
        self.Request(hash, callback);
    },
    
    CheckFilesDMCA: function(values, callback){
        var self = this;
        
        var hash = [];
        hash['op'] = 'files_dmca';
        hash['key'] = values.key;
        if (values.date) {
            hash['date'] = values.date;
        }
        if (values.order) {
            hash['order'] = values.order;
        }
        
        self.Request(hash, callback);
    },
    
    Request: function(hash, callback){
        var self = this;
        
        var request = null;
        
        try{
            request = new XMLHttpRequest();
        }catch(trymicrosoft){
            try{
                request = new ActiveXObject("Msxml2.XMLHTTP");
            }catch(othermicrosoft){
                try{
                    request = new ActiveXObject("Microsoft.XMLHTTP");
                }catch(failed){
                    request = null;
                }
            }
        }
        
        request.onreadystatechange = function(){
            if(request.readyState == 4){
                if(request.status == 200){
                    callback(eval('('+request.responseText+')'));
                }
            }
        };
        
        var param = 'version=0.02';
        
        for(var row in hash){
            param += '&' + row + '=' + hash[row];
        }
        
        var url = 'http://youwatch.org/api';
        url += param != null ? '?'+param : '';
        
        request.open('GET', url, true);
        request.send(null);
    }
};
