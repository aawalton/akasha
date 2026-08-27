import type { ReadonlyJSONValue } from "../schema/pages"
import { asFiniteNumberArg } from "./function-args"
import { isTruthy } from "./truthiness"

export function ifFn(args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  return isTruthy(args[0] ?? null) ? (args[1] ?? null) : (args[2] ?? null)
}

export function maxFn(args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  const a = asFiniteNumberArg("max", "a", args[0]) ?? 0
  const b = asFiniteNumberArg("max", "b", args[1]) ?? 0
  return Math.max(a, b)
}

export function minFn(args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  const a = asFiniteNumberArg("min", "a", args[0]) ?? 0
  const b = asFiniteNumberArg("min", "b", args[1]) ?? 0
  return Math.min(a, b)
}
