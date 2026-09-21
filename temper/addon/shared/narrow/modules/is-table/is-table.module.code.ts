import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

export function isTable(value: unknown): value is Record<string | number, unknown> {
  return type(value) === "table"
}
