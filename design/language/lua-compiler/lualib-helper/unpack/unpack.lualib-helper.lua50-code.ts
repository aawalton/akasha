import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

export function __TS__Unpack<T>(this: void, list: T[], i: number, j?: number): LuaMultiReturn<T[]> {
  if (i === 1 && j === undefined) {
    return unpack(list)
  } else {
    j ??= list.length
    const slice: T[] = []
    for (let n = i; n <= j; n++) {
      slice[n - i] = list[n - 1]
    }
    return $multi(...slice)
  }
}
