export function __TS__ObjectGetOwnPropertyDescriptor(
  this: void,
  object: any,
  key: any
): PropertyDescriptor | undefined {
  const metatable = getmetatable(object)
  if (!metatable) return
  const descriptors = rawget(metatable, "_descriptors")
  if (!descriptors) return
  return descriptors[key]
}
