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

describe("formulaFunctions (path & text)", () => {
  describe("joinPath", () => {
    test("arity 2", () => {
      const fn = formulaFunctions.get("joinPath")
      if (fn === undefined)
        throw new Error("expected formulaFunctions.get('joinPath') to be defined")
      expect(fn.arity).toBe(2)
    })

    test("null itemPath returns cardId", () => {
      expect(call("joinPath", ["card123", null])).toBe("card123")
    })

    test("empty array itemPath returns cardId", () => {
      expect(call("joinPath", ["card123", []])).toBe("card123")
    })

    test("single-segment itemPath joins with /", () => {
      expect(call("joinPath", ["card123", ["item1"]])).toBe("card123/item1")
    })

    test("multi-segment itemPath joins all with /", () => {
      expect(call("joinPath", ["card123", ["a", "b", "c"]])).toBe("card123/a/b/c")
    })

    test("null cardId → null", () => {
      expect(call("joinPath", [null, ["x"]])).toBeNull()
    })

    test("non-null non-string cardId throws function_argument_type_error", () => {
      expectEvalError(() => call("joinPath", [123, ["x"]]), "function_argument_type_error")
      expectEvalError(() => call("joinPath", [true, ["x"]]), "function_argument_type_error")
      expectEvalError(() => call("joinPath", [{ key: "v" }, ["x"]]), "function_argument_type_error")
    })

    test("non-array non-null itemPath throws function_argument_type_error", () => {
      expectEvalError(
        () => call("joinPath", ["card", "raw-string"]),
        "function_argument_type_error"
      )
      expectEvalError(() => call("joinPath", ["card", 123]), "function_argument_type_error")
      expectEvalError(() => call("joinPath", ["card", { x: 1 }]), "function_argument_type_error")
    })

    test("numeric segments coerce to string", () => {
      expect(call("joinPath", ["card", [1, 2, 3]])).toBe("card/1/2/3")
    })

    test("boolean segments coerce to string", () => {
      expect(call("joinPath", ["card", [true, false]])).toBe("card/true/false")
    })

    test("null segments coerce via String(null)", () => {
      expect(call("joinPath", ["card", [null]])).toBe("card/null")
    })
  })

  describe("containsText", () => {
    test("arity 2", () => {
      const fn = formulaFunctions.get("containsText")
      if (fn === undefined)
        throw new Error("expected formulaFunctions.get('containsText') to be defined")
      expect(fn.arity).toBe(2)
    })

    test("case-insensitive substring match → true", () => {
      expect(call("containsText", ["Projects", "project"])).toBe(true)
      expect(call("containsText", ["side PROJECT work", "project"])).toBe(true)
      expect(call("containsText", ["Project", "PROJECT"])).toBe(true)
    })

    test("no substring → false", () => {
      expect(call("containsText", ["Lunch", "project"])).toBe(false)
      expect(call("containsText", ["proj", "project"])).toBe(false)
    })

    test("null haystack → null (gates closed)", () => {
      expect(call("containsText", [null, "project"])).toBeNull()
    })

    test("null needle → null", () => {
      expect(call("containsText", ["Projects", null])).toBeNull()
    })

    test("non-null non-string args throw function_argument_type_error", () => {
      expectEvalError(() => call("containsText", [123, "x"]), "function_argument_type_error")
      expectEvalError(() => call("containsText", [true, "x"]), "function_argument_type_error")
      expectEvalError(() => call("containsText", [["a"], "x"]), "function_argument_type_error")
      expectEvalError(() => call("containsText", ["title", 1]), "function_argument_type_error")
      expectEvalError(() => call("containsText", ["title", true]), "function_argument_type_error")
    })
  })

  describe("registry", () => {
    test("known functions are registered", () => {
      expect([...formulaFunctions.keys()].sort()).toEqual([
        "addDays",
        "contains",
        "containsText",
        "count",
        "dayOfCycle",
        "daysBetween",
        "if",
        "joinPath",
        "max",
        "min",
        "now",
        "parseCalendarDate",
        "parseInstant",
        "recurrence",
        "resetInstant",
        "timeOfDay",
        "toCalendarDate",
        "toEsoDay",
        "today",
      ])
    })
  })
})
