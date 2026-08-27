import type { ReadonlyJSONValue } from "../schema/pages"

export function isTruthy(value: ReadonlyJSONValue): boolean {
  if (value == null) return false
  if (typeof value === "boolean") return value
  if (typeof value === "number") return value !== 0 && !Number.isNaN(value)
  if (typeof value === "string") return value !== ""
  return true
}
