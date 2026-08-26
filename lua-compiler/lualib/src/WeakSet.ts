export class WeakSet<T extends AnyNotNil> {
  public static [Symbol.species] = WeakSet
  public [Symbol.toStringTag] = "WeakSet"

  private items = new LuaTable<T, boolean | undefined>()

  constructor(values?: Iterable<T> | T[]) {
    setmetatable(this.items, { __mode: "k" })
    if (values === undefined) return

    if (values[Symbol.iterator]) {
      const iterator = values[Symbol.iterator]()
      while (true) {
        const result = iterator.next()
        if (result.done) {
          break
        }
        this.items.set(result.value, true)
      }
    } else {
      for (const value of values) {
        this.items.set(value, true)
      }
    }
  }

  public add(value: T): this {
    this.items.set(value, true)
    return this
  }

  public delete(value: T): boolean {
    const contains = this.has(value)
    this.items.set(value, undefined)
    return contains
  }

  public has(value: T): boolean {
    return this.items.get(value) === true
  }
}
