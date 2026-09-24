import "akasha/design/language/lua-compiler/lualib/lua-class/lua-class.type-declaration.d.ts"

export function __TS__Class(): LuaClass {
  const c: LuaClass = { prototype: {} }
  c.prototype.__index = c.prototype
  c.prototype.constructor = c
  return c
}
