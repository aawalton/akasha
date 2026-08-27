import { describe, expect, test } from "bun:test"
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

describe("formulaFunctions (date arithmetic)", () => {
  describe("addDays", () => {
    test("forward one day", () => {
      expect(call("addDays", ["2026-05-27", 1])).toBe("2026-05-28")
    })

    test("backward one day", () => {
      expect(call("addDays", ["2026-05-27", -1])).toBe("2026-05-26")
    })

    test("zero days is identity", () => {
      expect(call("addDays", ["2026-05-27", 0])).toBe("2026-05-27")
    })

    test("crosses year boundary forward", () => {
      expect(call("addDays", ["2026-12-31", 1])).toBe("2027-01-01")
    })

    test("crosses year boundary backward", () => {
      expect(call("addDays", ["2027-01-01", -1])).toBe("2026-12-31")
    })

    test("steps onto leap day (Feb 29 in leap year)", () => {
      expect(call("addDays", ["2024-02-28", 1])).toBe("2024-02-29")
    })

    test("steps over leap day to March", () => {
      expect(call("addDays", ["2024-02-29", 1])).toBe("2024-03-01")
    })

    test("non-leap February rolls to March", () => {
      expect(call("addDays", ["2025-02-28", 1])).toBe("2025-03-01")
    })

    test("365-day step in a non-leap year", () => {
      expect(call("addDays", ["2026-01-01", 365])).toBe("2027-01-01")
    })

    test("366-day step crosses a leap year", () => {
      expect(call("addDays", ["2024-01-01", 366])).toBe("2025-01-01")
    })

    test("non-integer n rounds to nearest", () => {
      expect(call("addDays", ["2026-05-27", 1.4])).toBe("2026-05-28")
      expect(call("addDays", ["2026-05-27", 1.6])).toBe("2026-05-29")
    })

    test("null date → null", () => {
      expect(call("addDays", [null, 1])).toBeNull()
    })

    test("null n → null", () => {
      expect(call("addDays", ["2026-05-27", null])).toBeNull()
    })

    test("non-string date throws function_argument_type_error", () => {
      expectEvalError(() => call("addDays", [123, 1]), "function_argument_type_error")
    })

    test("unparseable date string throws function_argument_type_error", () => {
      expectEvalError(() => call("addDays", ["not-a-date", 1]), "function_argument_type_error")
    })

    test("non-numeric n throws function_argument_type_error", () => {
      expectEvalError(() => call("addDays", ["2026-05-27", "1"]), "function_argument_type_error")
    })

    test("non-finite n throws function_argument_type_error", () => {
      expectEvalError(
        () => call("addDays", ["2026-05-27", Number.POSITIVE_INFINITY]),
        "function_argument_type_error"
      )
      expectEvalError(
        () => call("addDays", ["2026-05-27", Number.NaN]),
        "function_argument_type_error"
      )
    })
  })

  describe("daysBetween", () => {
    test("end one day after start → 1", () => {
      expect(call("daysBetween", ["2026-05-27", "2026-05-28"])).toBe(1)
    })

    test("end one day before start → -1", () => {
      expect(call("daysBetween", ["2026-05-28", "2026-05-27"])).toBe(-1)
    })

    test("same day → 0", () => {
      expect(call("daysBetween", ["2026-05-27", "2026-05-27"])).toBe(0)
    })

    test("non-leap year span → 365", () => {
      expect(call("daysBetween", ["2026-01-01", "2027-01-01"])).toBe(365)
    })

    test("leap year span → 366", () => {
      expect(call("daysBetween", ["2024-01-01", "2025-01-01"])).toBe(366)
    })

    test("crosses leap day → 1", () => {
      expect(call("daysBetween", ["2024-02-28", "2024-02-29"])).toBe(1)
    })

    test("null start → null", () => {
      expect(call("daysBetween", [null, "2026-05-27"])).toBeNull()
    })

    test("null end → null", () => {
      expect(call("daysBetween", ["2026-05-27", null])).toBeNull()
    })

    test("non-string start throws function_argument_type_error", () => {
      expectEvalError(
        () => call("daysBetween", [123, "2026-05-27"]),
        "function_argument_type_error"
      )
    })

    test("unparseable end throws function_argument_type_error", () => {
      expectEvalError(
        () => call("daysBetween", ["2026-05-27", "junk"]),
        "function_argument_type_error"
      )
    })
  })

  describe("dayOfCycle", () => {
    test("date equals epoch → 0", () => {
      expect(call("dayOfCycle", ["2026-02-21", "2026-02-21", 12])).toBe(0)
    })

    test("one day after epoch → 1", () => {
      expect(call("dayOfCycle", ["2026-02-22", "2026-02-21", 12])).toBe(1)
    })

    test("cycleLength-1 days after epoch → cycleLength-1", () => {
      expect(call("dayOfCycle", ["2026-03-04", "2026-02-21", 12])).toBe(11)
    })

    test("exactly cycleLength days after epoch wraps to 0", () => {
      expect(call("dayOfCycle", ["2026-03-05", "2026-02-21", 12])).toBe(0)
    })

    test("one day before epoch wraps to cycleLength-1 (positive modulo)", () => {
      expect(call("dayOfCycle", ["2026-02-20", "2026-02-21", 12])).toBe(11)
    })

    test("cycleLength days before epoch wraps to 0", () => {
      expect(call("dayOfCycle", ["2026-02-09", "2026-02-21", 12])).toBe(0)
    })

    test("cycle of 34 (Urgarlag) at exact wrap", () => {
      expect(call("dayOfCycle", ["2026-03-24", "2026-02-18", 34])).toBe(0)
    })

    test("null date → null", () => {
      expect(call("dayOfCycle", [null, "2026-02-21", 12])).toBeNull()
    })

    test("null epoch → null", () => {
      expect(call("dayOfCycle", ["2026-02-21", null, 12])).toBeNull()
    })

    test("null cycleLength → null", () => {
      expect(call("dayOfCycle", ["2026-02-21", "2026-02-21", null])).toBeNull()
    })

    test("non-string date throws function_argument_type_error", () => {
      expectEvalError(
        () => call("dayOfCycle", [123, "2026-02-21", 12]),
        "function_argument_type_error"
      )
    })

    test("non-numeric cycleLength throws function_argument_type_error", () => {
      expectEvalError(
        () => call("dayOfCycle", ["2026-02-21", "2026-02-21", "12"]),
        "function_argument_type_error"
      )
    })

    test("cycleLength of 0 throws divide_by_zero", () => {
      expectEvalError(() => call("dayOfCycle", ["2026-02-21", "2026-02-21", 0]), "divide_by_zero")
    })

    test("negative cycleLength throws function_argument_type_error", () => {
      expectEvalError(
        () => call("dayOfCycle", ["2026-02-21", "2026-02-21", -1]),
        "function_argument_type_error"
      )
    })

    test("non-integer cycleLength throws function_argument_type_error", () => {
      expectEvalError(
        () => call("dayOfCycle", ["2026-02-21", "2026-02-21", 1.5]),
        "function_argument_type_error"
      )
    })

    test("non-finite cycleLength throws function_argument_type_error", () => {
      expectEvalError(
        () => call("dayOfCycle", ["2026-02-21", "2026-02-21", Number.POSITIVE_INFINITY]),
        "function_argument_type_error"
      )
    })
  })
})
