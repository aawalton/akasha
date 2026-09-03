import { __TS__Promise } from "./Promise"

type Resolved<T> = T extends PromiseLike<infer U> ? U : T

function Resolved<T>(value: T): Resolved<T> {
  return value as Resolved<T>
}

export function __TS__PromiseAllSettled<T>(
  this: void,
  iterable: Iterable<T>
): Promise<Array<PromiseSettledResult<Resolved<T>>>> {
  const results: Array<PromiseSettledResult<Resolved<T>>> = []

  const toResolve = new LuaTable<number, PromiseLike<T>>()
  let numToResolve = 0

  let i = 0
  for (const item of iterable) {
    if (item instanceof __TS__Promise) {
      if (item.state.tag === "fulfilled") {
        results[i] = { status: "fulfilled", value: item.state.value }
      } else if (item.state.tag === "rejected") {
        results[i] = { status: "rejected", reason: item.state.reason }
      } else {
        numToResolve++
        toResolve.set(i, item)
      }
    } else {
      results[i] = { status: "fulfilled", value: Resolved(item) }
    }
    i++
  }

  if (numToResolve === 0) {
    return Promise.resolve(results)
  }

  return new Promise((resolve) => {
    for (const [index, promise] of pairs(toResolve)) {
      promise.then(
        (data) => {
          results[index] = { status: "fulfilled", value: Resolved(data) }
          numToResolve--
          if (numToResolve === 0) {
            resolve(results)
          }
        },
        (reason) => {
          results[index] = { status: "rejected", reason }
          numToResolve--
          if (numToResolve === 0) {
            resolve(results)
          }
        }
      )
    }
  })
}
