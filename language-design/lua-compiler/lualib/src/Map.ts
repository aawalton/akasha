export class Map<K extends AnyNotNil, V> {
  public static [Symbol.species] = Map
  public [Symbol.toStringTag] = "Map"

  private items = new LuaTable<K, V | undefined>()
  public size = 0

  private firstKey: K | undefined
  private lastKey: K | undefined
  private nextKey = new LuaTable<K, K | undefined>()
  private previousKey = new LuaTable<K, K | undefined>()

  constructor(entries?: Iterable<readonly [K, V]> | Array<readonly [K, V]>) {
    if (entries === undefined) return

    if (entries[Symbol.iterator]) {
      const iterator = entries[Symbol.iterator]()
      while (true) {
        const result = iterator.next()
        if (result.done) {
          break
        }

        const value: readonly [K, V] = result.value
        this.set(value[0], value[1])
      }
    } else {
      for (const kvp of entries) {
        this.set(kvp[0], kvp[1])
      }
    }
  }

  public clear(): undefined {
    this.items = new LuaTable()
    this.nextKey = new LuaTable()
    this.previousKey = new LuaTable()
    this.firstKey = undefined
    this.lastKey = undefined
    this.size = 0
  }

  public delete(key: K): boolean {
    const contains = this.has(key)
    if (contains) {
      this.size--

      const next = this.nextKey.get(key)
      const previous = this.previousKey.get(key)
      if (next !== undefined && previous !== undefined) {
        this.nextKey.set(previous, next)
        this.previousKey.set(next, previous)
      } else if (next !== undefined) {
        this.firstKey = next
        this.previousKey.set(next, undefined)
      } else if (previous !== undefined) {
        this.lastKey = previous
        this.nextKey.set(previous, undefined)
      } else {
        this.firstKey = undefined
        this.lastKey = undefined
      }

      this.nextKey.set(key, undefined)
      this.previousKey.set(key, undefined)
    }
    this.items.set(key, undefined)

    return contains
  }

  public forEach(callback: (value: V, key: K, map: Map<K, V>) => any): undefined {
    for (const key of this.keys()) {
      const value = this.items.get(key)
      if (value === undefined) {
        throw "Map.forEach: live key has undefined value"
      }
      callback(value, key, this)
    }
  }

  public get(key: K): V | undefined {
    return this.items.get(key)
  }

  public has(key: K): boolean {
    return this.nextKey.get(key) !== undefined || this.lastKey === key
  }

  public set(key: K, value: V): this {
    const isNewValue = !this.has(key)
    if (isNewValue) {
      this.size++
    }
    this.items.set(key, value)

    if (this.firstKey === undefined) {
      this.firstKey = key
      this.lastKey = key
    } else if (isNewValue) {
      const lastKey = this.lastKey
      if (lastKey === undefined) {
        throw "Map.set invariant: firstKey is set but lastKey is undefined"
      }
      this.nextKey.set(lastKey, key)
      this.previousKey.set(key, lastKey)
      this.lastKey = key
    }

    return this
  }

  public [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries()
  }

  public entries(): IterableIterator<[K, V]> {
    const { items, nextKey } = this
    let key = this.firstKey
    return {
      [Symbol.iterator](): IterableIterator<[K, V]> {
        return this
      },
      next(): IteratorResult<[K, V]> {
        if (key === undefined) {
          return { done: true, value: undefined }
        }
        const currentKey: K = key
        const value = items.get(currentKey)
        if (value === undefined) {
          throw "Map iterator: live key has undefined value"
        }
        const result: IteratorResult<[K, V]> = {
          done: false,
          value: [currentKey, value],
        }
        key = nextKey.get(currentKey)
        return result
      },
    }
  }

  public keys(): IterableIterator<K> {
    const nextKey = this.nextKey
    let key = this.firstKey
    return {
      [Symbol.iterator](): IterableIterator<K> {
        return this
      },
      next(): IteratorResult<K> {
        if (key === undefined) {
          return { done: true, value: undefined }
        }
        const currentKey: K = key
        const result: IteratorResult<K> = { done: false, value: currentKey }
        key = nextKey.get(currentKey)
        return result
      },
    }
  }

  public values(): IterableIterator<V> {
    const { items, nextKey } = this
    let key = this.firstKey
    return {
      [Symbol.iterator](): IterableIterator<V> {
        return this
      },
      next(): IteratorResult<V> {
        if (key === undefined) {
          return { done: true, value: undefined }
        }
        const currentKey: K = key
        const value = items.get(currentKey)
        if (value === undefined) {
          throw "Map.values: live key has undefined value"
        }
        const result: IteratorResult<V> = { done: false, value }
        key = nextKey.get(currentKey)
        return result
      },
    }
  }
}
