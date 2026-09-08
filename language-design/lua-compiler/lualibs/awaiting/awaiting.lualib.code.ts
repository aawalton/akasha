import { __TS__Coroutines } from "../coroutines/coroutines.lualib.code.ts"

const coyield = __TS__Coroutines.yield

export function __TS__Await(this: void, thing: unknown) {
  return coyield(thing)
}
