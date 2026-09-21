import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

export function __TS__StringAccess(this: string, index: number) {
  if (index >= 0 && index < this.length) {
    return string.sub(this, index + 1, index + 1)
  }
}
