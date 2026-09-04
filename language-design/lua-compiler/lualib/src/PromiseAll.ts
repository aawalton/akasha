import { __TS__Promise } from "./Promise"

function asT<T>(this: void, value: T | PromiseLike<T>): T {
  return value as T
}

export function __TS__PromiseAll<T>(
  this: void,
  iterable: Iterable<T | PromiseLike<T>>
): Promise<T[]> {
  const results: T[] = []

  const toResolve = new LuaTable<number, PromiseLike<T>>()
  let numToResolve = 0

  let i = 0
  for (const item of iterable) {
    if (item instanceof __TS__Promise) {
      if (item.state.tag === "fulfilled") {
        results[i] = item.state.value
      } else if (item.state.tag === "rejected") {
        return Promise.reject(item.state.reason)
      } else {
        numToResolve++
        toResolve.set(i, item)
      }
    } else {
      results[i] = asT(item)
    }
    i++
  }

  if (numToResolve === 0) {
    return Promise.resolve(results)
  }

  return new Promise((resolve, reject) => {
    for (const [index, promise] of pairs(toResolve)) {
      promise.then(
        (data) => {
          results[index] = data
          numToResolve--
          if (numToResolve === 0) {
            resolve(results)
          }
        },
        (reason) => {
          reject(reason)
        }
      )
    }
  })
}
