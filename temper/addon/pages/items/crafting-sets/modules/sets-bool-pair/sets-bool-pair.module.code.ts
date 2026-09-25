import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

type BoolPair<V> = LuaMap<boolean, V>

export function boolPair<V>(whenFalse: V, whenTrue: V): BoolPair<V> {
  const pair = new LuaMap<boolean, V>()
  pair.set(false, whenFalse)
  pair.set(true, whenTrue)
  return pair
}
