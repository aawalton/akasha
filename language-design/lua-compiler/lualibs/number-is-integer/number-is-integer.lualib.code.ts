import { __TS__NumberIsFinite } from "../number-is-finite/number-is-finite.lualib.code.ts"

export function __TS__NumberIsInteger(this: void, value: unknown): boolean {
  return __TS__NumberIsFinite(value) && math.floor(value) === value
}
