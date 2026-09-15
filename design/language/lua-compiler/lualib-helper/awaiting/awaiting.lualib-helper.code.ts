import { __TS__Coroutines } from "akasha/design/language/lua-compiler/lualib-helper/coroutines/coroutines.lualib-helper.code.ts"

const coyield = __TS__Coroutines.yield

export function __TS__Await(this: void, thing: unknown) {
  return coyield(thing)
}
