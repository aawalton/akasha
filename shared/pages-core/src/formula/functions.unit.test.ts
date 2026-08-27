import { describe, expect, test } from "bun:test"
import { getEsoDayStr, getEsoResetTime } from "../../../../day/day"
import type { ReadonlyJSONValue } from "../schema/pages"
import { FormulaEvaluationError, type FormulaEvaluationErrorCode } from "./errors"
import { formulaFunctions } from "./functions"

function call(name: string, args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  const fn = formulaFunctions.get(name)
  if (!fn) throw new Error(`unknown function ${name}`)
  return fn.call(args)
}

function expectEvalError(fn: () => unknown, code: FormulaEvaluationErrorCode): undefined {
  let caught: unknown = null
  try {
    fn()
  } catch (e) {
    caught = e
  }
  expect(caught).toBeInstanceOf(FormulaEvaluationError)
  if (caught instanceof FormulaEvaluationError) {
    expect(caught.code).toBe(code)
  }
}

describe("formulaFunctions (temporal)", () => {
  describe("toCalendarDate", () => {
    test("epoch zero → 1970-01-01", () => {
      expect(call("toCalendarDate", [0])).toBe("1970-01-01")
    })

    test("a known UTC instant formats correctly", () => {
      expect(call("toCalendarDate", [Date.UTC(2024, 2, 15)])).toBe("2024-03-15")
    })

    test("zero-pads single-digit month and day", () => {
      expect(call("toCalendarDate", [Date.UTC(2024, 0, 5)])).toBe("2024-01-05")
    })

    test("negative epoch (pre-1970)", () => {
      expect(call("toCalendarDate", [Date.UTC(1969, 11, 31)])).toBe("1969-12-31")
    })

    test("null arg → null", () => {
      expect(call("toCalendarDate", [null])).toBeNull()
    })

    test("undefined arg (missing) → null", () => {
      expect(call("toCalendarDate", [])).toBeNull()
    })

    test("string arg throws function_argument_type_error", () => {
      expectEvalError(() => call("toCalendarDate", ["123"]), "function_argument_type_error")
    })

    test("boolean arg throws function_argument_type_error", () => {
      expectEvalError(() => call("toCalendarDate", [true]), "function_argument_type_error")
    })

    test("NaN arg throws function_argument_type_error", () => {
      expectEvalError(() => call("toCalendarDate", [Number.NaN]), "function_argument_type_error")
    })

    test("Infinity arg throws function_argument_type_error", () => {
      expectEvalError(
        () => call("toCalendarDate", [Number.POSITIVE_INFINITY]),
        "function_argument_type_error"
      )
    })
  })

  describe("toEsoDay", () => {
    test("evening-ET completion (post-UTC-midnight) → that evening's logical day", () => {
      expect(call("toEsoDay", [Date.parse("2026-06-20T02:36:15.129Z")])).toBe("2026-06-19")
      expect(call("toCalendarDate", [Date.parse("2026-06-20T02:36:15.129Z")])).toBe("2026-06-20")
    })

    test("morning-ET completion (UTC date == logical day) → same day", () => {
      expect(call("toEsoDay", [Date.parse("2026-06-20T14:00:00.000Z")])).toBe("2026-06-20")
    })

    test("pre-reset instant in EST (winter, cross-year) → previous logical day", () => {
      expect(call("toEsoDay", [Date.parse("2026-01-01T08:00:00.000Z")])).toBe("2025-12-31")
    })

    test("agrees with getEsoDayStr for an arbitrary instant", () => {
      const ms = Date.parse("2026-03-09T05:30:00.000Z")
      expect(call("toEsoDay", [ms])).toBe(getEsoDayStr(new Date(ms)))
    })

    test("null arg → null", () => {
      expect(call("toEsoDay", [null])).toBeNull()
    })

    test("undefined arg (missing) → null", () => {
      expect(call("toEsoDay", [])).toBeNull()
    })

    test("string arg throws function_argument_type_error", () => {
      expectEvalError(() => call("toEsoDay", ["123"]), "function_argument_type_error")
    })

    test("NaN arg throws function_argument_type_error", () => {
      expectEvalError(() => call("toEsoDay", [Number.NaN]), "function_argument_type_error")
    })
  })

  describe("timeOfDay", () => {
    test("epoch zero → 00:00", () => {
      expect(call("timeOfDay", [0])).toBe("00:00")
    })

    test("14:37 UTC formats with zero padding", () => {
      expect(call("timeOfDay", [Date.UTC(2024, 0, 1, 14, 37)])).toBe("14:37")
    })

    test("zero-pads single-digit hour and minute", () => {
      expect(call("timeOfDay", [Date.UTC(2024, 0, 1, 3, 7)])).toBe("03:07")
    })

    test("truncates seconds (does not round)", () => {
      expect(call("timeOfDay", [Date.UTC(2024, 0, 1, 5, 30, 59)])).toBe("05:30")
    })

    test("null arg → null", () => {
      expect(call("timeOfDay", [null])).toBeNull()
    })

    test("string arg throws function_argument_type_error", () => {
      expectEvalError(() => call("timeOfDay", ["abc"]), "function_argument_type_error")
    })

    test("NaN arg throws function_argument_type_error", () => {
      expectEvalError(() => call("timeOfDay", [Number.NaN]), "function_argument_type_error")
    })
  })

  describe("parseInstant", () => {
    test("registered with arity 1", () => {
      const fn = formulaFunctions.get("parseInstant")
      if (fn === undefined)
        throw new Error("expected formulaFunctions.get('parseInstant') to be defined")
      expect(fn.arity).toBe(1)
    })

    test("ISO instant → epoch ms", () => {
      expect(call("parseInstant", ["2024-03-15T00:00:00.000Z"])).toBe(Date.UTC(2024, 2, 15))
    })

    test("ISO instant preserves time-of-day", () => {
      expect(call("parseInstant", ["2024-03-15T12:30:45.000Z"])).toBe(
        Date.UTC(2024, 2, 15, 12, 30, 45)
      )
    })

    test("round-trips with toCalendarDate at the day level", () => {
      const ms = call("parseInstant", ["2026-06-02T09:15:00.000Z"])
      expect(call("toCalendarDate", [ms])).toBe("2026-06-02")
    })

    test("null arg → null", () => {
      expect(call("parseInstant", [null])).toBeNull()
    })

    test("undefined arg (missing) → null", () => {
      expect(call("parseInstant", [])).toBeNull()
    })

    test("ms-epoch number passes through unchanged", () => {
      expect(call("parseInstant", [1781220624578])).toBe(1781220624578)
    })

    test("epoch zero number passes through unchanged", () => {
      expect(call("parseInstant", [0])).toBe(0)
    })

    test("canonical ISO-ms string round-trips to its epoch ms", () => {
      expect(call("parseInstant", [new Date(1781220624578).toISOString()])).toBe(1781220624578)
    })

    test("boolean arg throws function_argument_type_error", () => {
      expectEvalError(() => call("parseInstant", [true]), "function_argument_type_error")
    })

    test("unparseable string throws function_argument_type_error", () => {
      expectEvalError(() => call("parseInstant", ["not-a-date"]), "function_argument_type_error")
    })
  })

  describe("now", () => {
    test("arity 0", () => {
      const fn = formulaFunctions.get("now")
      if (fn === undefined) throw new Error("expected formulaFunctions.get('now') to be defined")
      expect(fn.arity).toBe(0)
    })

    test("returns a finite number close to Date.now()", () => {
      const before = Date.now()
      const result = call("now", [])
      const after = Date.now()
      expect(typeof result).toBe("number")
      if (typeof result !== "number") throw new Error("expected number")
      expect(Number.isFinite(result)).toBe(true)
      expect(result).toBeGreaterThanOrEqual(before)
      expect(result).toBeLessThanOrEqual(after)
    })
  })

  describe("today", () => {
    test("arity 0", () => {
      const fn = formulaFunctions.get("today")
      if (fn === undefined) throw new Error("expected formulaFunctions.get('today') to be defined")
      expect(fn.arity).toBe(0)
    })

    test("returns a YYYY-MM-DD string", () => {
      const result = call("today", [])
      expect(typeof result).toBe("string")
      if (typeof result !== "string") throw new Error("expected string")
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })

    test("returns the ESO NA logical day (rolls at 06:00 America/New_York)", () => {
      const expected = getEsoDayStr(new Date())
      expect(call("today", [])).toBe(expected)
    })
  })

  describe("resetInstant", () => {
    test("arity 0", () => {
      const fn = formulaFunctions.get("resetInstant")
      if (fn === undefined)
        throw new Error("expected formulaFunctions.get('resetInstant') to be defined")
      expect(fn.arity).toBe(0)
    })

    test("returns the most-recent ESO reset instant as epoch ms", () => {
      const expected = getEsoResetTime(new Date()).getTime()
      const result = call("resetInstant", [])
      expect(typeof result).toBe("number")
      if (typeof result !== "number") throw new Error("expected number")
      expect(Math.abs(result - expected)).toBeLessThanOrEqual(86_400_000)
    })

    test("is in the past and within the last ~25h of now()", () => {
      const reset = call("resetInstant", [])
      const nowMs = call("now", [])
      if (typeof reset !== "number" || typeof nowMs !== "number")
        throw new Error("expected numbers")
      const elapsed = nowMs - reset
      expect(elapsed).toBeGreaterThanOrEqual(0)
      expect(elapsed).toBeLessThanOrEqual(25 * 60 * 60 * 1000)
    })
  })

  describe("recurrence", () => {
    test("arity 2", () => {
      const fn = formulaFunctions.get("recurrence")
      if (fn === undefined)
        throw new Error("expected formulaFunctions.get('recurrence') to be defined")
      expect(fn.arity).toBe(2)
    })

    test("daily rrule advances by one day", () => {
      const start = Date.UTC(2024, 2, 15)
      const next = call("recurrence", [start, "RRULE:FREQ=DAILY"])
      expect(typeof next).toBe("number")
      if (typeof next !== "number") throw new Error("expected number")
      expect(next).toBeGreaterThan(start)
      expect(next - start).toBeGreaterThan(0)
    })

    test("weekly rrule advances by seven days", () => {
      const start = Date.UTC(2024, 2, 15)
      const next = call("recurrence", [start, "RRULE:FREQ=WEEKLY"])
      expect(typeof next).toBe("number")
      if (typeof next !== "number") throw new Error("expected number")
      expect(next).toBeGreaterThan(start)
    })

    test("non-finite timestamp throws function_argument_type_error", () => {
      expectEvalError(
        () => call("recurrence", [Number.NaN, "RRULE:FREQ=DAILY"]),
        "function_argument_type_error"
      )
      expectEvalError(
        () => call("recurrence", [Number.POSITIVE_INFINITY, "RRULE:FREQ=DAILY"]),
        "function_argument_type_error"
      )
    })

    test("null timestamp → null", () => {
      expect(call("recurrence", [null, "RRULE:FREQ=DAILY"])).toBeNull()
    })

    test("non-string non-null rrule throws function_argument_type_error", () => {
      expectEvalError(
        () => call("recurrence", [Date.UTC(2024, 2, 15), 123]),
        "function_argument_type_error"
      )
    })

    test("null rrule → null", () => {
      expect(call("recurrence", [Date.UTC(2024, 2, 15), null])).toBeNull()
    })

    test("invalid rrule string throws function_argument_type_error", () => {
      expectEvalError(
        () => call("recurrence", [Date.UTC(2024, 2, 15), "not a real rrule"]),
        "function_argument_type_error"
      )
    })

    test("string timestamp throws function_argument_type_error", () => {
      expectEvalError(
        () => call("recurrence", ["1700000000000", "RRULE:FREQ=DAILY"]),
        "function_argument_type_error"
      )
    })
  })
})
