import { __TS__Promise } from "./Promise"

export function __TS__PromiseAny<T>(
  this: void,
  iterable: Iterable<T | PromiseLike<T>>
): Promise<T> {
  const rejections: string[] = []
  const pending: Array<PromiseLike<T>> = []

  for (const item of iterable) {
    if (item instanceof __TS__Promise) {
      if (item.state.tag === "fulfilled") {
        return Promise.resolve(item.state.value)
      } else if (item.state.tag === "rejected") {
        rejections.push(item.state.reason)
      } else {
        pending.push(item)
      }
    } else {
      return Promise.resolve(item)
    }
  }

  if (pending.length === 0) {
    return Promise.reject("No promises to resolve with .any()")
  }

  let numResolved = 0

  return new Promise((resolve, reject) => {
    for (const promise of pending) {
      promise.then(
        (data) => {
          resolve(data)
        },
        (reason) => {
          rejections.push(reason)
          numResolved++
          if (numResolved === pending.length) {
            reject({
              name: "AggregateError",
              message: "All Promises rejected",
              errors: rejections,
            })
          }
        }
      )
    }
  })
}
