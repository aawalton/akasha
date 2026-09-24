import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

export function __TS__ObjectGetOwnPropertyDescriptors(
  this: void,
  object: any
): Record<any, PropertyDescriptor | undefined> {
  const metatable = getmetatable(object)
  if (!metatable) return {}
  return rawget(metatable as any, "_descriptors") ?? {}
}
