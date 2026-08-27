import { describe, expect, test } from "bun:test"
import { evaluateFormula } from "./evaluate"
import { FormulaEvaluationError, type FormulaEvaluationErrorCode } from "./errors"
import { type FormulaNode, parseExpression } from "./parser"

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

describe("evaluateFormula", () => {
  describe("literals", () => {
    test("number node returns the number", () => {
      const node: FormulaNode = { type: "number", value: 42 }
      expect(evaluateFormula(node, {})).toBe(42)
    })

    test("string node returns the string", () => {
      const node: FormulaNode = { type: "string", value: "hello" }
      expect(evaluateFormula(node, {})).toBe("hello")
    })
  })

  describe("prop references", () => {
    test("present key returns value", () => {
      const node: FormulaNode = { type: "prop", id: "x" }
      expect(evaluateFormula(node, { x: 10 })).toBe(10)
    })

    test("missing key returns null", () => {
      const node: FormulaNode = { type: "prop", id: "missing" }
      expect(evaluateFormula(node, {})).toBeNull()
    })
  })

  describe("logical operators", () => {
    test("&& short-circuits on first falsy and returns it", () => {
      const ast = parseExpression("0 && 1")
      expect(evaluateFormula(ast, {})).toBe(0)
    })

    test("&& returns last operand when all truthy", () => {
      const ast = parseExpression("1 && 2")
      expect(evaluateFormula(ast, {})).toBe(2)
    })

    test("|| returns first truthy", () => {
      const ast = parseExpression("0 || 5")
      expect(evaluateFormula(ast, {})).toBe(5)
    })

    test("|| returns last when all falsy", () => {
      const ast = parseExpression("0 || 0")
      expect(evaluateFormula(ast, {})).toBe(0)
    })

    test("! truthy → false", () => {
      const ast = parseExpression("!1")
      expect(evaluateFormula(ast, {})).toBe(false)
    })

    test("! falsy → true", () => {
      const ast = parseExpression("!0")
      expect(evaluateFormula(ast, {})).toBe(true)
    })

    test("! null → true", () => {
      const ast = parseExpression("!prop(missing)")
      expect(evaluateFormula(ast, {})).toBe(true)
    })

    test("! empty string → true", () => {
      const ast = parseExpression("!prop(s)")
      expect(evaluateFormula(ast, { s: "" })).toBe(true)
    })

    test("&& short-circuits — does not evaluate right when left is falsy", () => {
      const ast = parseExpression("0 && 1 / 0")
      expect(evaluateFormula(ast, {})).toBe(0)
    })
  })

  describe("namespaced (dotted) refs", () => {
    test("source.title looks up nested object", () => {
      const ast = parseExpression("source.title")
      expect(evaluateFormula(ast, { source: { title: "hi" } })).toBe("hi")
    })

    test("source.previous.completedAt walks two levels", () => {
      const ast = parseExpression("source.previous.completedAt")
      expect(evaluateFormula(ast, { source: { previous: { completedAt: 42 } } })).toBe(42)
    })

    test("missing namespace returns null", () => {
      const ast = parseExpression("source.title")
      expect(evaluateFormula(ast, {})).toBeNull()
    })

    test("missing intermediate path returns null", () => {
      const ast = parseExpression("source.previous.completedAt")
      expect(evaluateFormula(ast, { source: {} })).toBeNull()
    })

    test("walking through a non-object intermediate throws ref_lookup_type_error", () => {
      const ast = parseExpression("source.previous.completedAt")
      expectEvalError(
        () => evaluateFormula(ast, { source: { previous: 5 } }),
        "ref_lookup_type_error"
      )
    })

    test("missing leaf returns null", () => {
      const ast = parseExpression("source.title")
      expect(evaluateFormula(ast, { source: {} })).toBeNull()
    })

    test("intermediate null segment propagates as null (not a type error)", () => {
      const ast = parseExpression("source.previous.completedAt")
      expect(evaluateFormula(ast, { source: { previous: null } })).toBeNull()
    })
  })

  describe("function calls (end-to-end)", () => {
    test("toCalendarDate(prop(dueAt)) derives YYYY-MM-DD from ms-epoch", () => {
      const ast = parseExpression("toCalendarDate(prop(dueAt))")
      expect(evaluateFormula(ast, { dueAt: Date.UTC(2024, 2, 15) })).toBe("2024-03-15")
    })

    test("timeOfDay(prop(dueAt)) derives HH:MM from ms-epoch", () => {
      const ast = parseExpression("timeOfDay(prop(dueAt))")
      expect(evaluateFormula(ast, { dueAt: Date.UTC(2024, 0, 1, 14, 37) })).toBe("14:37")
    })

    test("missing prop flows null through the call → null", () => {
      const ast = parseExpression("toCalendarDate(prop(missing))")
      expect(evaluateFormula(ast, {})).toBeNull()
    })

    test("call result concatenates with string via +", () => {
      const ast = parseExpression("'due ' + toCalendarDate(prop(dueAt))")
      expect(evaluateFormula(ast, { dueAt: Date.UTC(2024, 2, 15) })).toBe("due 2024-03-15")
    })
  })

  describe("reserved-identifier literals", () => {
    test("null evaluates to null", () => {
      expect(evaluateFormula(parseExpression("null"), {})).toBeNull()
    })

    test("true evaluates to true", () => {
      expect(evaluateFormula(parseExpression("true"), {})).toBe(true)
    })

    test("false evaluates to false", () => {
      expect(evaluateFormula(parseExpression("false"), {})).toBe(false)
    })

    test("source.x != null is true when set", () => {
      const ast = parseExpression("source.rrule != null")
      expect(evaluateFormula(ast, { source: { rrule: "FREQ=DAILY" } })).toBe(true)
    })

    test("source.x != null is false when missing", () => {
      const ast = parseExpression("source.rrule != null")
      expect(evaluateFormula(ast, { source: {} })).toBe(false)
    })

    test("object != null throws equality_non_scalar — must dotted-access an inner scalar", () => {
      const ast = parseExpression("source.rrule != null")
      const objShape = { source: { rrule: { rule: "FREQ=DAILY", anchorFromCompletion: false } } }
      expectEvalError(() => evaluateFormula(ast, objShape), "equality_non_scalar")

      const innerAst = parseExpression("source.rrule.rule != null")
      expect(evaluateFormula(innerAst, objShape)).toBe(true)
      expect(evaluateFormula(innerAst, { source: { rrule: null } })).toBe(false)
      expect(evaluateFormula(innerAst, { source: {} })).toBe(false)
    })

    test("|| picks truthy operand on right", () => {
      const ast = parseExpression("false || source.x")
      expect(evaluateFormula(ast, { source: { x: 42 } })).toBe(42)
    })
  })

  describe("parseCalendarDate", () => {
    test("valid YYYY-MM-DD returns the matching Date.UTC ms", () => {
      const ast = parseExpression("parseCalendarDate(prop(d))")
      expect(evaluateFormula(ast, { d: "2026-04-28" })).toBe(Date.UTC(2026, 3, 28))
    })

    test("invalid string throws function_argument_type_error", () => {
      const ast = parseExpression("parseCalendarDate(prop(d))")
      expectEvalError(
        () => evaluateFormula(ast, { d: "not-a-date" }),
        "function_argument_type_error"
      )
    })

    test("empty string throws function_argument_type_error", () => {
      const ast = parseExpression("parseCalendarDate(prop(d))")
      expectEvalError(() => evaluateFormula(ast, { d: "" }), "function_argument_type_error")
    })

    test("non-string number input throws function_argument_type_error", () => {
      const ast = parseExpression("parseCalendarDate(prop(d))")
      expectEvalError(() => evaluateFormula(ast, { d: 1234567890 }), "function_argument_type_error")
    })

    test("missing prop (null) returns null", () => {
      const ast = parseExpression("parseCalendarDate(prop(missing))")
      expect(evaluateFormula(ast, {})).toBeNull()
    })

    test("array input throws function_argument_type_error", () => {
      const ast = parseExpression("parseCalendarDate(prop(d))")
      expectEvalError(
        () => evaluateFormula(ast, { d: ["2026-04-28"] }),
        "function_argument_type_error"
      )
    })

    test("round-trip: toCalendarDate(parseCalendarDate(s)) === s", () => {
      const ast = parseExpression("toCalendarDate(parseCalendarDate(prop(d)))")
      expect(evaluateFormula(ast, { d: "2026-04-28" })).toBe("2026-04-28")
    })
  })

  describe("contains", () => {
    test("contains(['a','b'], 'a') → true", () => {
      const ast = parseExpression("contains(prop(arr), 'a')")
      expect(evaluateFormula(ast, { arr: ["a", "b"] })).toBe(true)
    })

    test("contains(['a','b'], 'c') → false", () => {
      const ast = parseExpression("contains(prop(arr), 'c')")
      expect(evaluateFormula(ast, { arr: ["a", "b"] })).toBe(false)
    })

    test("contains([], 'a') → false", () => {
      const ast = parseExpression("contains(prop(arr), 'a')")
      expect(evaluateFormula(ast, { arr: [] })).toBe(false)
    })

    test("contains(non-array, 'a') throws function_argument_type_error", () => {
      const ast = parseExpression("contains(prop(s), 'a')")
      expectEvalError(
        () => evaluateFormula(ast, { s: "not-an-array" }),
        "function_argument_type_error"
      )
    })

    test("contains(null, 'a') propagates as null", () => {
      const ast = parseExpression("contains(prop(missing), 'a')")
      expect(evaluateFormula(ast, {})).toBeNull()
    })

    test("contains([1,2,3], 2) → true", () => {
      const ast = parseExpression("contains(prop(arr), 2)")
      expect(evaluateFormula(ast, { arr: [1, 2, 3] })).toBe(true)
    })

    test("contains([1,2,3], '2') → false (strict equality, no coercion)", () => {
      const ast = parseExpression("contains(prop(arr), '2')")
      expect(evaluateFormula(ast, { arr: [1, 2, 3] })).toBe(false)
    })
  })

  describe("count", () => {
    test("count(['a','b']) → 2", () => {
      const ast = parseExpression("count(prop(arr))")
      expect(evaluateFormula(ast, { arr: ["a", "b"] })).toBe(2)
    })

    test("count([]) → 0 (empty array, the fail-open case for bare `&&` gates)", () => {
      const ast = parseExpression("count(prop(arr))")
      expect(evaluateFormula(ast, { arr: [] })).toBe(0)
    })

    test("count(null / missing) → 0", () => {
      const ast = parseExpression("count(prop(missing))")
      expect(evaluateFormula(ast, {})).toBe(0)
    })

    test("count(x) >= 1 gates non-empty vs empty multi-relation", () => {
      const ast = parseExpression("count(prop(arr)) >= 1")
      expect(evaluateFormula(ast, { arr: ["x"] })).toBe(true)
      expect(evaluateFormula(ast, { arr: [] })).toBe(false)
      expect(evaluateFormula(ast, {})).toBe(false)
    })

    test("count(non-array) throws function_argument_type_error", () => {
      const ast = parseExpression("count(prop(s))")
      expectEvalError(
        () => evaluateFormula(ast, { s: "not-an-array" }),
        "function_argument_type_error"
      )
    })
  })
})
