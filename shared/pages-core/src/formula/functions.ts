import { getEsoDayStr, getEsoResetTime } from "../../../../day/day"
import { advanceRecurrenceDueDate } from "@shared/recurrence/scheduling"
import type { ReadonlyJSONValue } from "../schema/pages"
import { FormulaEvaluationError } from "./errors"
import { asCalendarDateMsArg, asFiniteNumberArg, pad2 } from "./function-args"
import { ifFn, maxFn, minFn } from "./functions-conditional-clamp"
import { addDays, dayOfCycle, daysBetween } from "./functions-date-arithmetic"
import { contains, containsText, count, joinPath } from "./functions-path-text"

export interface FormulaFunction {
  readonly arity: number
  readonly call: (args: readonly ReadonlyJSONValue[]) => ReadonlyJSONValue
}

function toCalendarDate(args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  const ms = asFiniteNumberArg("toCalendarDate", "msEpoch", args[0])
  if (ms === null) return null
  const d = new Date(ms)
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`
}

function toEsoDay(args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  const ms = asFiniteNumberArg("toEsoDay", "msEpoch", args[0])
  if (ms === null) return null
  return getEsoDayStr(new Date(ms))
}

function parseCalendarDate(args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  return asCalendarDateMsArg("parseCalendarDate", "dateString", args[0])
}

function parseInstant(args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  const raw = args[0]
  if (raw === undefined || raw === null) return null
  if (typeof raw === "number" && Number.isFinite(raw)) return raw
  if (typeof raw !== "string") {
    throw new FormulaEvaluationError(
      "function_argument_type_error",
      `parseInstant: expected an ISO-8601 string or epoch ms number, got ${typeof raw}`
    )
  }
  const ms = Date.parse(raw)
  if (Number.isNaN(ms)) {
    throw new FormulaEvaluationError(
      "function_argument_type_error",
      `parseInstant: unparseable ISO-8601 instant '${raw}'`
    )
  }
  return ms
}

function timeOfDay(args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  const ms = asFiniteNumberArg("timeOfDay", "msEpoch", args[0])
  if (ms === null) return null
  const d = new Date(ms)
  return `${pad2(d.getUTCHours())}:${pad2(d.getUTCMinutes())}`
}

function now(_args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  return Date.now()
}

function today(_args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  return getEsoDayStr(new Date())
}

function resetInstant(_args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  return getEsoResetTime(new Date()).getTime()
}

function recurrence(args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  const ms = asFiniteNumberArg("recurrence", "timestampMs", args[0])
  const rrule = args[1]
  if (ms === null) return null
  if (rrule === undefined || rrule === null) return null
  if (typeof rrule !== "string" || rrule.length === 0) {
    throw new FormulaEvaluationError(
      "function_argument_type_error",
      `recurrence: rruleString must be a non-empty string, got ${typeof rrule}`
    )
  }

  const anchor = new Date(ms)
  const pad = (n: number) => String(n).padStart(2, "0")
  const dueDate = `${anchor.getUTCFullYear()}-${pad(anchor.getUTCMonth() + 1)}-${pad(anchor.getUTCDate())}`
  const h = anchor.getUTCHours()
  const m = anchor.getUTCMinutes()
  const dueTime = h === 0 && m === 0 ? null : `${pad(h)}:${pad(m)}`

  let result: ReturnType<typeof advanceRecurrenceDueDate>
  try {
    result = advanceRecurrenceDueDate(
      {
        dueDate,
        dueTime,
        rrule,
      },
      new Date(),
      getEsoResetTime
    )
  } catch (err) {
    throw new FormulaEvaluationError(
      "function_argument_type_error",
      `recurrence: failed to parse rrule '${rrule}': ${err instanceof Error ? err.message : String(err)}`
    )
  }
  if (result == null) {
    throw new FormulaEvaluationError(
      "function_argument_type_error",
      `recurrence: rrule '${rrule}' produced no occurrence`
    )
  }
  return new Date(`${result.dueDate}T${result.dueTime ?? "00:00"}:00Z`).getTime()
}

export const formulaFunctions: ReadonlyMap<string, FormulaFunction> = new Map([
  ["if", { arity: 3, call: ifFn }],
  ["max", { arity: 2, call: maxFn }],
  ["min", { arity: 2, call: minFn }],
  ["toCalendarDate", { arity: 1, call: toCalendarDate }],
  ["toEsoDay", { arity: 1, call: toEsoDay }],
  ["parseCalendarDate", { arity: 1, call: parseCalendarDate }],
  ["parseInstant", { arity: 1, call: parseInstant }],
  ["timeOfDay", { arity: 1, call: timeOfDay }],
  ["now", { arity: 0, call: now }],
  ["today", { arity: 0, call: today }],
  ["resetInstant", { arity: 0, call: resetInstant }],
  ["recurrence", { arity: 2, call: recurrence }],
  ["contains", { arity: 2, call: contains }],
  ["containsText", { arity: 2, call: containsText }],
  ["count", { arity: 1, call: count }],
  ["joinPath", { arity: 2, call: joinPath }],
  ["addDays", { arity: 2, call: addDays }],
  ["daysBetween", { arity: 2, call: daysBetween }],
  ["dayOfCycle", { arity: 3, call: dayOfCycle }],
])
