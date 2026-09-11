import { __TS__NumberIsNaN } from "akasha/language-design/lua-compiler/lualibs/number-is-nan/number-is-nan.lualib.code.ts"

export function __TS__MathSign(this: void, val: number) {
  if (__TS__NumberIsNaN(val) || val === 0) {
    return val
  }

  if (val < 0) {
    return -1
  }

  return 1
}
