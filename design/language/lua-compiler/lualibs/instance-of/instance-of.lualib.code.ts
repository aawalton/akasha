export function __TS__InstanceOf(this: void, obj: LuaClassInstance, classTbl: LuaClass): boolean {
  if (typeof classTbl !== "object") {
    throw "Right-hand side of 'instanceof' is not an object"
  }

  const hasInstance = classTbl[Symbol.hasInstance]
  if (hasInstance !== undefined) {
    return Boolean(hasInstance(obj))
  }

  if (typeof obj === "object") {
    let luaClass: LuaClass | undefined = obj.constructor
    while (luaClass !== undefined) {
      if (luaClass === classTbl) {
        return true
      }
      luaClass = luaClass.____super
    }
  }
  return false
}
