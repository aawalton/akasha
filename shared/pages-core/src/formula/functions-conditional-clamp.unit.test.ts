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

describe("if (conditional)", () => {
  test("truthy condition → first branch", () => {
    expect(call("if", [true, "a", "b"])).toBe("a")
  })

  test("falsy condition → second branch", () => {
    expect(call("if", [false, "a", "b"])).toBe("b")
  })

  test("0 is falsy → second branch", () => {
    expect(call("if", [0, 1, 2])).toBe(2)
  })

  test("null is falsy → second branch", () => {
    expect(call("if", [null, 1, 2])).toBe(2)
  })

  test('"" is falsy → second branch', () => {
    expect(call("if", ["", 1, 2])).toBe(2)
  })

  test("non-empty string is truthy → first branch", () => {
    expect(call("if", ["x", 1, 2])).toBe(1)
  })

  test("non-zero number is truthy → first branch", () => {
    expect(call("if", [3, "y", "n"])).toBe("y")
  })
})

describe("max", () => {
  test("returns the larger of two numbers", () => {
    expect(call("max", [3, 7])).toBe(7)
    expect(call("max", [7, 3])).toBe(7)
  })

  test("null coerces to 0 (arithmetic null-as-0)", () => {
    expect(call("max", [null, -5])).toBe(0)
    expect(call("max", [-5, null])).toBe(0)
  })

  test("throws function_argument_type_error on a non-null non-number", () => {
    expectEvalError(() => call("max", ["x", 1]), "function_argument_type_error")
  })
})

describe("min", () => {
  test("returns the smaller of two numbers", () => {
    expect(call("min", [3, 7])).toBe(3)
    expect(call("min", [7, 3])).toBe(3)
  })

  test("null coerces to 0 (arithmetic null-as-0)", () => {
    expect(call("min", [null, 5])).toBe(0)
    expect(call("min", [5, null])).toBe(0)
  })

  test("throws function_argument_type_error on a non-null non-number", () => {
    expectEvalError(() => call("min", [1, "x"]), "function_argument_type_error")
  })
})
