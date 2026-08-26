import { __TS__Promise } from "./Promise"

export function __TS__PromiseRace<T>(
  this: void,
  iterable: Iterable<T | PromiseLike<T>>
): Promise<T> {
  const pending: Array<PromiseLike<T>> = []

  for (const item of iterable) {
    if (item instanceof __TS__Promise) {
      if (item.state.tag === "fulfilled") {
        return Promise.resolve(item.state.value)
      } else if (item.state.tag === "rejected") {
        return Promise.reject(item.state.reason)
      } else {
        pending.push(item)
      }
    } else {
      return Promise.resolve(item)
    }
  }

  return new Promise((resolve, reject) => {
    for (const promise of pending) {
      promise.then(
        (value) => resolve(value),
        (reason) => reject(reason)
      )
    }
  })
}
