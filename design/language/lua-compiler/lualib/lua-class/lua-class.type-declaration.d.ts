interface LuaClass extends LuaMetatable<any> {
  prototype: LuaClassInstance
  ____super?: LuaClass
  [Symbol.hasInstance]?: (this: LuaClass, instance: LuaClassInstance) => unknown
}

interface LuaClassInstance extends LuaMetatable<any> {
  constructor: LuaClass
}
