function asT<T>(value: unknown): T {
  return value as T
}

export class Set<T extends AnyNotNil> {
  public static [Symbol.species] = Set
  public [Symbol.toStringTag] = "Set"

  public size = 0

  private firstKey: T | undefined
  private lastKey: T | undefined
  private nextKey = new LuaTable<T, T | undefined>()
  private previousKey = new LuaTable<T, T | undefined>()

  constructor(values?: Iterable<T> | T[]) {
    if (values === undefined) return

    if (values[Symbol.iterator]) {
      const iterator = values[Symbol.iterator]()
      while (true) {
        const result = iterator.next()
        if (result.done) {
          break
        }
        this.add(result.value)
      }
    } else {
      for (const value of values) {
        this.add(value)
      }
    }
  }

  public add(value: T): Set<T> {
    const isNewValue = !this.has(value)
    if (isNewValue) {
      this.size++
    }

    if (this.firstKey === undefined) {
      this.firstKey = value
      this.lastKey = value
    } else if (isNewValue) {
      const lastKey = this.lastKey
      if (lastKey === undefined) {
        throw "Set.add invariant: firstKey is set but lastKey is undefined"
      }
      this.nextKey.set(lastKey, value)
      this.previousKey.set(value, lastKey)
      this.lastKey = value
    }

    return this
  }

  public clear(): undefined {
    this.nextKey = new LuaTable()
    this.previousKey = new LuaTable()
    this.firstKey = undefined
    this.lastKey = undefined
    this.size = 0
  }

  public delete(value: T): boolean {
    const contains = this.has(value)
    if (contains) {
      this.size--

      const next = this.nextKey.get(value)
      const previous = this.previousKey.get(value)
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

      this.nextKey.set(value, undefined)
      this.previousKey.set(value, undefined)
    }

    return contains
  }

  public forEach(callback: (value: T, key: T, set: Set<T>) => any): undefined {
    for (const key of this.keys()) {
      callback(key, key, this)
    }
  }

  public has(value: T): boolean {
    return this.nextKey.get(value) !== undefined || this.lastKey === value
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this.values()
  }

  public entries(): IterableIterator<[T, T]> {
    const nextKey = this.nextKey
    let key: T | undefined = this.firstKey
    return {
      [Symbol.iterator](): IterableIterator<[T, T]> {
        return this
      },
      next(): IteratorResult<[T, T]> {
        if (key === undefined) {
          return { done: true, value: undefined }
        }
        const currentKey: T = key
        const result: IteratorResult<[T, T]> = { done: false, value: [currentKey, currentKey] }
        key = nextKey.get(currentKey)
        return result
      },
    }
  }

  public keys(): IterableIterator<T> {
    const nextKey = this.nextKey
    let key: T | undefined = this.firstKey
    return {
      [Symbol.iterator](): IterableIterator<T> {
        return this
      },
      next(): IteratorResult<T> {
        if (key === undefined) {
          return { done: true, value: undefined }
        }
        const currentKey: T = key
        const result: IteratorResult<T> = { done: false, value: currentKey }
        key = nextKey.get(currentKey)
        return result
      },
    }
  }

  public values(): IterableIterator<T> {
    const nextKey = this.nextKey
    let key: T | undefined = this.firstKey
    return {
      [Symbol.iterator](): IterableIterator<T> {
        return this
      },
      next(): IteratorResult<T> {
        if (key === undefined) {
          return { done: true, value: undefined }
        }
        const currentKey: T = key
        const result: IteratorResult<T> = { done: false, value: currentKey }
        key = nextKey.get(currentKey)
        return result
      },
    }
  }

  public union(other: ReadonlySet<T>): Set<T> {
    const result = new Set<T>(this)
    for (const item of other) {
      result.add(item)
    }
    return result
  }

  public intersection(other: ReadonlySet<T>) {
    const result = new Set<T>()
    for (const item of this) {
      if (other.has(item)) {
        result.add(item)
      }
    }
    return result
  }

  public difference(other: ReadonlySet<T>): Set<T> {
    const result = new Set<T>(this)
    for (const item of other) {
      result.delete(item)
    }
    return result
  }

  public symmetricDifference(other: ReadonlySet<T>): Set<T> {
    const result = new Set<T>(this)
    for (const item of other) {
      if (this.has(item)) {
        result.delete(item)
      } else {
        result.add(item)
      }
    }
    return result
  }

  public isSubsetOf(other: ReadonlySet<unknown>): boolean {
    for (const item of this) {
      if (!other.has(item)) {
        return false
      }
    }
    return true
  }

  public isSupersetOf(other: ReadonlySet<unknown>): boolean {
    for (const item of other) {
      if (!this.has(asT<T>(item))) {
        return false
      }
    }
    return true
  }

  public isDisjointFrom(other: ReadonlySetLike<unknown>): boolean {
    for (const item of this) {
      if (other.has(item)) {
        return false
      }
    }
    return true
  }
}
