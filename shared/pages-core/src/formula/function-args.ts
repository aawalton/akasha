import type { ReadonlyJSONValue } from "../schema/pages"
import { FormulaEvaluationError } from "./errors"

export function asFiniteNumberArg(
  fnName: string,
  argName: string,
  value: ReadonlyJSONValue | undefined
): number | null {
  if (value === undefined || value === null) return null
  if (typeof value === "number" && Number.isFinite(value)) return value
  throw new FormulaEvaluationError(
    "function_argument_type_error",
    `${fnName}: ${argName} must be a finite number, got ${typeof value === "number" ? "non-finite number" : typeof value}`
  )
}

export function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n)
}

const CALENDAR_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

function parseCalendarDateMs(fnName: string, raw: string): number {
  if (!CALENDAR_DATE_REGEX.test(raw)) {
    throw new FormulaEvaluationError(
      "function_argument_type_error",
      `${fnName}: '${raw}' is not a valid YYYY-MM-DD date string`
    )
  }
  const [y, m, d] = raw.split("-").map(Number)
  if (y === undefined || m === undefined || d === undefined) {
    throw new FormulaEvaluationError(
      "function_argument_type_error",
      `${fnName}: '${raw}' did not parse to year/month/day`
    )
  }
  const ms = Date.UTC(y, m - 1, d)
  if (!Number.isFinite(ms)) {
    throw new FormulaEvaluationError(
      "function_argument_type_error",
      `${fnName}: '${raw}' produced a non-finite epoch`
    )
  }
  return ms
}

export function asCalendarDateMsArg(
  fnName: string,
  argName: string,
  value: ReadonlyJSONValue | undefined
): number | null {
  if (value === undefined || value === null) return null
  if (typeof value !== "string") {
    throw new FormulaEvaluationError(
      "function_argument_type_error",
      `${fnName}: ${argName} must be a string, got ${typeof value}`
    )
  }
  return parseCalendarDateMs(fnName, value)
}

export function asNonNegativeIntegerArg(
  fnName: string,
  argName: string,
  value: ReadonlyJSONValue | undefined
): number | null {
  if (value === undefined || value === null) return null
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new FormulaEvaluationError(
      "function_argument_type_error",
      `${fnName}: ${argName} must be a finite number, got ${typeof value === "number" ? "non-finite number" : typeof value}`
    )
  }
  if (!Number.isInteger(value)) {
    throw new FormulaEvaluationError(
      "function_argument_type_error",
      `${fnName}: ${argName} must be an integer, got ${value}`
    )
  }
  if (value < 0) {
    throw new FormulaEvaluationError(
      "function_argument_type_error",
      `${fnName}: ${argName} must be non-negative, got ${value}`
    )
  }
  return value
}

export const MS_PER_DAY = 86_400_000
