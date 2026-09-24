import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/lualib/lua-class/lua-class.type-declaration.d.ts"

export function __TS__New(this: void, target: LuaClass, ...args: any[]): any {
  const instance: any = setmetatable({}, target.prototype)
  instance.____constructor(...args)
  return instance
}
