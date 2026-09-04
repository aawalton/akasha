type LuaTableView<T> = LuaTable<number, T | undefined>
function LuaTableView<T>(arr: unknown): LuaTableView<T> {
  return arr as LuaTableView<T>
}

export function __TS__ArraySetLength<T>(this: T[], length: number): number {
  if (length < 0 || length !== length || length === Infinity || Math.floor(length) !== length) {
    throw `invalid array length: ${length}`
  }
  const items = LuaTableView<T>(this)
  for (const i of $range(length + 1, this.length)) {
    items.set(i, undefined)
  }
  return length
}
