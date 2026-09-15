import { __TS__NumberIsFinite } from "akasha/design/language/lua-compiler/lualib-helper/number-is-finite/number-is-finite.lualib-helper.code.ts"

export function __TS__NumberIsInteger(this: void, value: unknown): boolean {
  return __TS__NumberIsFinite(value) && math.floor(value) === value
}
