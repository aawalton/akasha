import { describe, expect, test } from "bun:test"
import type { ReadonlyJSONValue } from "../schema/pages"
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

describe("bracket access — parser", () => {
  test("simple bracket access: a[b]", () => {
    expect(parseExpression("prop(a)['name']")).toEqual({
      type: "bracket_access",
      obj: { type: "prop", id: "a" },
      key: { type: "string", value: "name" },
    })
  })

  test("bracket with dynamic key: prop(obj)[prop(k)]", () => {
    expect(parseExpression("prop(obj)[prop(k)]")).toEqual({
      type: "bracket_access",
      obj: { type: "prop", id: "obj" },
      key: { type: "prop", id: "k" },
    })
  })

  test("chained bracket access: a[b][c]", () => {
    expect(parseExpression("prop(o)['x']['y']")).toEqual({
      type: "bracket_access",
      obj: {
        type: "bracket_access",
        obj: { type: "prop", id: "o" },
        key: { type: "string", value: "x" },
      },
      key: { type: "string", value: "y" },
    })
  })

  test("mixed dot then bracket: source.x[key]", () => {
    expect(parseExpression("source.x['name']")).toEqual({
      type: "bracket_access",
      obj: { type: "ref", path: ["source", "x"] },
      key: { type: "string", value: "name" },
    })
  })

  test("bracket on call result: contains(prop(arr), 1)['x']", () => {
    expect(parseExpression("contains(prop(arr), 1)['x']")).toEqual({
      type: "bracket_access",
      obj: {
        type: "call",
        name: "contains",
        args: [
          { type: "prop", id: "arr" },
          { type: "number", value: 1 },
        ],
      },
      key: { type: "string", value: "x" },
    })
  })

  test("binds tighter than unary minus: -prop(o)['k']", () => {
    expect(parseExpression("-prop(o)['k']")).toEqual({
      type: "unary_minus",
      operand: {
        type: "bracket_access",
        obj: { type: "prop", id: "o" },
        key: { type: "string", value: "k" },
      },
    })
  })

  test("arity check still applies inside bracket: contains(prop(a))['k']", () => {
    expect(() => parseExpression("contains(prop(a))['k']")).toThrow(FormulaParseError)
  })

  test("missing closing bracket throws: prop(o)['k'", () => {
    expect(() => parseExpression("prop(o)['k'")).toThrow(FormulaParseError)
  })

  test("empty bracket throws: prop(o)[]", () => {
    expect(() => parseExpression("prop(o)[]")).toThrow(FormulaParseError)
  })
})

describe("bracket access — evaluator", () => {
  test("hit returns the value", () => {
    const ast = parseExpression("prop(data)['name']")
    expect(evaluateFormula(ast, { data: { name: "Alice" } })).toBe("Alice")
  })

  test("miss on real object returns null", () => {
    const ast = parseExpression("prop(data)['missing']")
    expect(evaluateFormula(ast, { data: { name: "Alice" } })).toBeNull()
  })

  test("miss on empty real object returns null", () => {
    const ast = parseExpression("prop(data)['a']")
    expect(evaluateFormula(ast, { data: {} })).toBeNull()
  })

  test("null left side propagates as null", () => {
    const ast = parseExpression("prop(data)['x']")
    expect(evaluateFormula(ast, { data: null })).toBeNull()
    expect(evaluateFormula(ast, {})).toBeNull()
  })

  test("non-null non-object left side throws bracket_access_type_error", () => {
    const ast = parseExpression("prop(data)['x']")
    const badLefts: ReadonlyJSONValue[] = [42, "string", true, [1, 2, 3]]
    for (const data of badLefts) {
      expectEvalError(() => evaluateFormula(ast, { data }), "bracket_access_type_error")
    }
  })

  test("null key propagates as null", () => {
    const ast = parseExpression("prop(data)[prop(k)]")
    expect(evaluateFormula(ast, { data: { x: 1 }, k: null })).toBeNull()
  })

  test("non-null non-string key throws bracket_access_type_error", () => {
    const ast = parseExpression("prop(data)[prop(k)]")
    const badKeys: ReadonlyJSONValue[] = [123, true, { nested: "obj" }]
    for (const k of badKeys) {
      expectEvalError(
        () => evaluateFormula(ast, { data: { x: 1 }, k }),
        "bracket_access_type_error"
      )
    }
  })

  test("chained access reaches deep value", () => {
    const ast = parseExpression("prop(data)['x']['y']")
    expect(evaluateFormula(ast, { data: { x: { y: 42 } } })).toBe(42)
  })

  test("chained access stops at miss", () => {
    const ast = parseExpression("prop(data)['missing']['y']")
    expect(evaluateFormula(ast, { data: { x: { y: 42 } } })).toBeNull()
  })

  test("dynamic key from values", () => {
    const ast = parseExpression("prop(data)[prop(activeKey)]")
    expect(evaluateFormula(ast, { data: { foo: 1, bar: 2 }, activeKey: "bar" })).toBe(2)
  })

  test("dynamic key resolving to absent → null", () => {
    const ast = parseExpression("prop(data)[prop(activeKey)]")
    expect(evaluateFormula(ast, { data: { foo: 1, bar: 2 }, activeKey: "qux" })).toBeNull()
  })

  test("bracket on dotted ref", () => {
    const ast = parseExpression("source.idx['k']")
    expect(evaluateFormula(ast, { source: { idx: { k: "v" } } })).toBe("v")
  })

  test("bracket on function result whose type is wrong throws bracket_access_type_error", () => {
    const ast = parseExpression("contains(prop(arr), prop(needle))['x']")
    expectEvalError(
      () => evaluateFormula(ast, { arr: [1], needle: 1 }),
      "bracket_access_type_error"
    )
  })
})
