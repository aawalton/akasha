import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

export function __TS__InstanceOfObject(this: void, value: unknown): boolean {
  const valueType = type(value)
  return valueType === "table" || valueType === "function"
}
