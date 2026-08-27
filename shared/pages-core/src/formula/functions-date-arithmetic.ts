import type { ReadonlyJSONValue } from "../schema/pages"
import { FormulaEvaluationError } from "./errors"
import {
  asCalendarDateMsArg,
  asFiniteNumberArg,
  asNonNegativeIntegerArg,
  MS_PER_DAY,
  pad2,
} from "./function-args"

export function addDays(args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  const dateMs = asCalendarDateMsArg("addDays", "dateString", args[0])
  const n = asFiniteNumberArg("addDays", "n", args[1])
  if (dateMs === null || n === null) return null
  const resultMs = dateMs + Math.round(n) * MS_PER_DAY
  const d = new Date(resultMs)
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`
}

export function daysBetween(args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  const startMs = asCalendarDateMsArg("daysBetween", "startDateString", args[0])
  const endMs = asCalendarDateMsArg("daysBetween", "endDateString", args[1])
  if (startMs === null || endMs === null) return null
  return Math.round((endMs - startMs) / MS_PER_DAY)
}

export function dayOfCycle(args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  const dateMs = asCalendarDateMsArg("dayOfCycle", "dateString", args[0])
  const epochMs = asCalendarDateMsArg("dayOfCycle", "epochDateString", args[1])
  const cycleLength = asNonNegativeIntegerArg("dayOfCycle", "cycleLength", args[2])
  if (dateMs === null || epochMs === null || cycleLength === null) return null
  if (cycleLength === 0) {
    throw new FormulaEvaluationError(
      "divide_by_zero",
      "dayOfCycle: cycleLength must be positive (got 0)"
    )
  }
  const days = Math.round((dateMs - epochMs) / MS_PER_DAY)
  return ((days % cycleLength) + cycleLength) % cycleLength
}
