export function __TS__ArrayEntries<T>(this: void, array: T[]): IterableIterator<[number, T]> {
  let key = 0
  return {
    [Symbol.iterator](): IterableIterator<[number, T]> {
      return this
    },
    next(): IteratorResult<[number, T]> {
      const value: [number, T] = [key, array[key]]
      const result = { done: array[key] === undefined, value }
      key++
      return result
    },
  }
}
