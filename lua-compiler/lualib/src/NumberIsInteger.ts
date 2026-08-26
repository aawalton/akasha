import { __TS__NumberIsFinite } from "./NumberIsFinite"

export function __TS__NumberIsInteger(this: void, value: unknown): boolean {
  return __TS__NumberIsFinite(value) && math.floor(value) === value
}
