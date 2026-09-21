import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

export function __TS__CountVarargs<T>(this: void, ...args: T[]): number {
  return select("#", ...args)
}
