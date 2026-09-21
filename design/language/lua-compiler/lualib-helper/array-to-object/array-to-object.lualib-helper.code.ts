import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

export function __TS__ArrayToObject<T>(this: T[]): Record<number, T> {
  const object: Record<number, any> = {}
  for (const i of $range(1, this.length)) {
    object[i - 1] = this[i - 1]
  }
  return object
}
