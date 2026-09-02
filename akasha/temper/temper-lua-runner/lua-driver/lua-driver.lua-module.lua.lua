io.stdout:setvbuf("no")

local io_read = io.read
local io_write = io.write
local string_format = string.format
local string_byte = string.byte
local string_gsub = string.gsub
local table_concat = table.concat
local math_huge = math.huge
local math_floor = math.floor
local pcall_local = pcall
local loadstring_local = loadstring
local tostring_local = tostring
local pairs_local = pairs
local type_local = type

local RUN_SENTINEL = "<<<__LUA_RUN__>>>"
local DONE_SENTINEL = "<<<__LUA_DONE__>>>"

local encode

local function encode_string(s)
  s = string_gsub(s, "\\", "\\\\")
  s = string_gsub(s, '"', '\\"')
  s = string_gsub(s, "\n", "\\n")
  s = string_gsub(s, "\r", "\\r")
  s = string_gsub(s, "\t", "\\t")
  s = string_gsub(s, "\b", "\\b")
  s = string_gsub(s, "\f", "\\f")
  s = string_gsub(s, "[\1-\31]", function(c) return string_format("\\u%04x", string_byte(c)) end)
  return '"' .. s .. '"'
end

local function encode_number(n)
  if n ~= n then return '{"__lua_kind":"nan"}' end
  if n == math_huge then return '{"__lua_kind":"inf"}' end
  if n == -math_huge then return '{"__lua_kind":"-inf"}' end
  if math_floor(n) == n and n > -1e15 and n < 1e15 then
    return string_format("%d", n)
  end
  return string_format("%.14g", n)
end

local function is_array(t)
  local n = 0
  for k, _ in pairs_local(t) do
    if type_local(k) ~= "number" then return false, 0 end
    if k ~= math_floor(k) or k < 1 then return false, 0 end
    if k > n then n = k end
  end
  if n == 0 then return false, 0 end
  for i = 1, n do
    if t[i] == nil then return false, 0 end
  end
  return true, n
end

encode = function(v)
  local t = type_local(v)
  if t == "nil" then return "null" end
  if t == "boolean" then if v then return "true" else return "false" end end
  if t == "number" then return encode_number(v) end
  if t == "string" then return encode_string(v) end
  if t == "table" then
    local arr, n = is_array(v)
    if arr then
      local parts = {}
      for i = 1, n do parts[i] = encode(v[i]) end
      return "[" .. table_concat(parts, ",") .. "]"
    else
      local parts = {}
      for k, val in pairs_local(v) do
        local kt = type_local(k)
        if kt == "string" or kt == "number" then
          parts[#parts + 1] = encode_string(tostring_local(k)) .. ":" .. encode(val)
        end
      end
      return "{" .. table_concat(parts, ",") .. "}"
    end
  end
  return '{"__lua_kind":"function"}'
end

while true do
  local lines = {}
  local got_sentinel = false
  while true do
    local line = io_read("*l")
    if line == nil then return end
    if line == RUN_SENTINEL then
      got_sentinel = true
      break
    end
    lines[#lines + 1] = line
  end
  if not got_sentinel then return end
  local script = table_concat(lines, "\n")
  local chunk, load_err = loadstring_local(script, "user-script")
  if not chunk then
    io_write('{"ok":false,"error":')
    io_write(encode_string(tostring_local(load_err)))
    io_write("}")
  else
    local ok, result = pcall_local(chunk)
    if ok then
      io_write('{"ok":true,"value":')
      io_write(encode(result))
      io_write("}")
    else
      io_write('{"ok":false,"error":')
      io_write(encode_string(tostring_local(result)))
      io_write("}")
    end
  end
  io_write("\n")
  io_write(DONE_SENTINEL)
  io_write("\n")
end
