import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

export function defined<T>(value: T | undefined): T {
  if (value === undefined) {
    error("TemperItemsCrafting: unexpected nil value")
  }
  return value
}
