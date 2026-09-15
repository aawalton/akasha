import { __TS__NumberIsFinite } from "akasha/design/language/lua-compiler/lualib-helper/number-is-finite/number-is-finite.lualib-helper.code.ts"
export function __TS__MathTrunc(this: void, val: number) {
  if (!__TS__NumberIsFinite(val) || val === 0) {
    return val
  }

  return val > 0 ? math.floor(val) : math.ceil(val)
}
