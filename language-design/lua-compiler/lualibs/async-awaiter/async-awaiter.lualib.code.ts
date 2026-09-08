import { __TS__Promise } from "../../lualib/src/Promise.ts"
import { __TS__Coroutines } from "../coroutines/coroutines.lualib.code.ts"

const cocreate = __TS__Coroutines.create
const coresume = __TS__Coroutines.resume
const costatus = __TS__Coroutines.status

export function __TS__AsyncAwaiter(this: void, generator: (this: void) => void) {
  return new Promise((resolve, reject) => {
    let resolved = false
    const asyncCoroutine = cocreate(generator)

    function fulfilled(value: unknown): undefined {
      const [success, resultOrError] = coresume(asyncCoroutine, value)
      if (success) {
        return step(resultOrError)
      }
      return reject(resultOrError)
    }

    function step(this: void, result: unknown): undefined {
      if (resolved) {
        return
      }
      if (costatus(asyncCoroutine) === "dead") {
        return resolve(result)
      }
      return __TS__Promise.resolve(result).addCallbacks(fulfilled, reject)
    }

    const [success, resultOrError] = coresume(asyncCoroutine, (v: unknown) => {
      resolved = true
      return __TS__Promise.resolve(v).addCallbacks(resolve, reject)
    })
    if (success) {
      return step(resultOrError)
    } else {
      return reject(resultOrError)
    }
  })
}
