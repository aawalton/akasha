import { describe, expect, test } from "bun:test"
import { evaluateFormula } from "./evaluate"
import { FormulaEvaluationError, type FormulaEvaluationErrorCode } from "./errors"
import { parseExpression } from "./parser"
import { FormulaParseError } from "./lexer"

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

describe("array literal — parser", () => {
  test("empty array", () => {
    expect(parseExpression("[]")).toEqual({ type: "array", elements: [] })
  })

  test("single number element", () => {
    expect(parseExpression("[1]")).toEqual({
      type: "array",
      elements: [{ type: "number", value: 1 }],
    })
  })

  test("multiple number elements", () => {
    expect(parseExpression("[1, 2, 3]")).toEqual({
      type: "array",
      elements: [
        { type: "number", value: 1 },
        { type: "number", value: 2 },
        { type: "number", value: 3 },
      ],
    })
  })

  test("string elements", () => {
    expect(parseExpression('["a", "b"]')).toEqual({
      type: "array",
      elements: [
        { type: "string", value: "a" },
        { type: "string", value: "b" },
      ],
    })
  })

  test("heterogeneous scalar elements", () => {
    expect(parseExpression('[1, "a", true, null]')).toEqual({
      type: "array",
      elements: [
        { type: "number", value: 1 },
        { type: "string", value: "a" },
        { type: "boolean", value: true },
        { type: "null" },
      ],
    })
  })

  test("expression elements (refs and binary ops)", () => {
    expect(parseExpression("[prop(x), source.y, 1 + 2]")).toEqual({
      type: "array",
      elements: [
        { type: "prop", id: "x" },
        { type: "ref", path: ["source", "y"] },
        {
          type: "binary",
          op: "+",
          left: { type: "number", value: 1 },
          right: { type: "number", value: 2 },
        },
      ],
    })
  })

  test("nested arrays", () => {
    expect(parseExpression("[[1, 2], [3, 4]]")).toEqual({
      type: "array",
      elements: [
        {
          type: "array",
          elements: [
            { type: "number", value: 1 },
            { type: "number", value: 2 },
          ],
        },
        {
          type: "array",
          elements: [
            { type: "number", value: 3 },
            { type: "number", value: 4 },
          ],
        },
      ],
    })
  })

  test("array as function argument", () => {
    expect(parseExpression('contains(["pending", "running"], source.status)')).toEqual({
      type: "call",
      name: "contains",
      args: [
        {
          type: "array",
          elements: [
            { type: "string", value: "pending" },
            { type: "string", value: "running" },
          ],
        },
        { type: "ref", path: ["source", "status"] },
      ],
    })
  })

  test("trailing comma is a parse error", () => {
    expect(() => parseExpression("[1, 2,]")).toThrow(FormulaParseError)
  })

  test("missing comma between elements is a parse error", () => {
    expect(() => parseExpression("[1 2]")).toThrow(FormulaParseError)
  })

  test("unterminated array literal is a parse error", () => {
    expect(() => parseExpression("[1, 2")).toThrow(FormulaParseError)
  })

  test("lone closing bracket is a parse error", () => {
    expect(() => parseExpression("]")).toThrow(FormulaParseError)
  })

  test("array literal followed by bracket access parses as bracket_access on array", () => {
    expect(parseExpression("[1, 2][0]")).toEqual({
      type: "bracket_access",
      obj: {
        type: "array",
        elements: [
          { type: "number", value: 1 },
          { type: "number", value: 2 },
        ],
      },
      key: { type: "number", value: 0 },
    })
  })
})

describe("array literal — evaluator", () => {
  test("empty array literal evaluates to []", () => {
    expect(evaluateFormula(parseExpression("[]"), {})).toEqual([])
  })

  test("scalar number array preserves order", () => {
    expect(evaluateFormula(parseExpression("[1, 2, 3]"), {})).toEqual([1, 2, 3])
  })

  test("scalar string array", () => {
    expect(evaluateFormula(parseExpression('["a", "b"]'), {})).toEqual(["a", "b"])
  })

  test("heterogeneous scalar elements", () => {
    expect(evaluateFormula(parseExpression('[1, "a", true, null]'), {})).toEqual([
      1,
      "a",
      true,
      null,
    ])
  })

  test("element expressions are evaluated against the values bag", () => {
    expect(evaluateFormula(parseExpression("[prop(x), prop(y)]"), { x: 1, y: 2 })).toEqual([1, 2])
  })

  test("missing-ref element propagates as null inside the array", () => {
    expect(evaluateFormula(parseExpression("[prop(missing)]"), {})).toEqual([null])
  })

  test("nested array literal", () => {
    expect(evaluateFormula(parseExpression("[[1, 2], [3, 4]]"), {})).toEqual([
      [1, 2],
      [3, 4],
    ])
  })

  test("binary-op element is computed", () => {
    expect(evaluateFormula(parseExpression("[1 + 2, 3 * 4]"), {})).toEqual([3, 12])
  })

  test("contains with inline array literal — string set match", () => {
    const ast = parseExpression('contains(["pending", "running"], source.status)')
    expect(evaluateFormula(ast, { source: { status: "pending" } })).toBe(true)
    expect(evaluateFormula(ast, { source: { status: "done" } })).toBe(false)
  })

  test("contains with inline array literal — number set match", () => {
    const ast = parseExpression("contains([1, 2, 3], 2)")
    expect(evaluateFormula(ast, {})).toBe(true)
  })

  test("originating use case (#9762 T-cross): scope predicate via inline literal", () => {
    const ast = parseExpression('contains(["next_character", "all_characters"], source.scope)')
    expect(evaluateFormula(ast, { source: { scope: "next_character" } })).toBe(true)
    expect(evaluateFormula(ast, { source: { scope: "all_characters" } })).toBe(true)
    expect(evaluateFormula(ast, { source: { scope: "this_character" } })).toBe(false)
  })

  test("bracket access against an array literal raises bracket_access_type_error", () => {
    expectEvalError(
      () => evaluateFormula(parseExpression("[1, 2][0]"), {}),
      "bracket_access_type_error"
    )
  })
})
