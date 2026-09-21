import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

export function isCallback<T>(
  value: T | ((this: void, ...args: unknown[]) => T)
): value is (this: void, ...args: unknown[]) => T {
  return type(value) === "function"
}
