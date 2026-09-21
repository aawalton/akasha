import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

export function __TS__StringTrimStart(this: string): string {
  const [result] = string.gsub(this, "^[%s\xA0\uFEFF]*", "")
  return result
}
