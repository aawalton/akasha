import { __TS__Coroutines } from "akasha/language-design/lua-compiler/lualibs/coroutines/coroutines.lualib.code.ts"

const coyield = __TS__Coroutines.yield

export function __TS__Await(this: void, thing: unknown) {
  return coyield(thing)
}
