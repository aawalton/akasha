import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

export function __TS__ArrayJoin(this: any[], separator = ",") {
  const parts: string[] = []
  for (const i of $range(1, this.length)) {
    parts[i - 1] = this[i - 1].toString()
  }
  return table.concat(parts, separator)
}
