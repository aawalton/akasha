import { describe, expect, test } from "bun:test"
import { getEsoDayStr } from "../../../../day/day"
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

describe("evaluateFormula — date-mention title composition", () => {
  test('"@date:" + today() yields an @date:<eso-today> token', () => {
    const node = parseExpression('"@date:" + today()')
    expect(evaluateFormula(node, {})).toBe(`@date:${getEsoDayStr(new Date())}`)
  })
})

describe("evaluateFormula — unary minus", () => {
  test("negates a number", () => {
    const node: FormulaNode = {
      type: "unary_minus",
      operand: { type: "number", value: 5 },
    }
    expect(evaluateFormula(node, {})).toBe(-5)
  })

  test("non-null wrong-type input throws arithmetic_nan", () => {
    const node: FormulaNode = {
      type: "unary_minus",
      operand: { type: "prop", id: "s" },
    }
    expectEvalError(() => evaluateFormula(node, { s: "not a number" }), "arithmetic_nan")
  })

  test("null operand coerces to 0 (yields -0 via -Number(null))", () => {
    const node: FormulaNode = {
      type: "unary_minus",
      operand: { type: "prop", id: "missing" },
    }
    const result = evaluateFormula(node, {})
    expect(typeof result).toBe("number")
    expect(result === 0).toBe(true)
  })
})

describe("evaluateFormula — binary +", () => {
  test("number + number = sum", () => {
    const node: FormulaNode = {
      type: "binary",
      op: "+",
      left: { type: "number", value: 3 },
      right: { type: "number", value: 7 },
    }
    expect(evaluateFormula(node, {})).toBe(10)
  })

  test("string + string = concat", () => {
    const node: FormulaNode = {
      type: "binary",
      op: "+",
      left: { type: "string", value: "foo" },
      right: { type: "string", value: "bar" },
    }
    expect(evaluateFormula(node, {})).toBe("foobar")
  })

  test("string + number = concat", () => {
    const node: FormulaNode = {
      type: "binary",
      op: "+",
      left: { type: "string", value: "count: " },
      right: { type: "number", value: 5 },
    }
    expect(evaluateFormula(node, {})).toBe("count: 5")
  })

  test("null coercion: null prop + string concatenates as empty string", () => {
    const node: FormulaNode = {
      type: "binary",
      op: "+",
      left: { type: "prop", id: "missing" },
      right: { type: "string", value: "suffix" },
    }
    expect(evaluateFormula(node, {})).toBe("suffix")
  })

  test("numeric path: null operand coerces to 0 (matches JS arithmetic)", () => {
    const ast = parseExpression("prop(missing) + 1")
    expect(evaluateFormula(ast, {})).toBe(1)
  })

  test("numeric path: non-null non-string wrong-shape operand throws arithmetic_nan", () => {
    const ast = parseExpression("prop(o) + 1")
    expectEvalError(() => evaluateFormula(ast, { o: { x: 1 } }), "arithmetic_nan")
  })
})

describe("evaluateFormula — binary -", () => {
  test("normal subtraction", () => {
    const node: FormulaNode = {
      type: "binary",
      op: "-",
      left: { type: "number", value: 10 },
      right: { type: "number", value: 3 },
    }
    expect(evaluateFormula(node, {})).toBe(7)
  })

  test("non-null wrong-shape operand throws arithmetic_nan", () => {
    const node: FormulaNode = {
      type: "binary",
      op: "-",
      left: { type: "string", value: "abc" },
      right: { type: "number", value: 1 },
    }
    expectEvalError(() => evaluateFormula(node, {}), "arithmetic_nan")
  })

  test("null operand coerces to 0", () => {
    const ast = parseExpression("prop(missing) - 1")
    expect(evaluateFormula(ast, {})).toBe(-1)
  })
})

describe("evaluateFormula — binary *", () => {
  test("normal multiplication", () => {
    const node: FormulaNode = {
      type: "binary",
      op: "*",
      left: { type: "number", value: 4 },
      right: { type: "number", value: 5 },
    }
    expect(evaluateFormula(node, {})).toBe(20)
  })

  test("null operand coerces to 0", () => {
    const ast = parseExpression("prop(missing) * 2")
    expect(evaluateFormula(ast, {})).toBe(0)
  })
})

describe("evaluateFormula — binary /", () => {
  test("normal division", () => {
    const node: FormulaNode = {
      type: "binary",
      op: "/",
      left: { type: "number", value: 10 },
      right: { type: "number", value: 4 },
    }
    expect(evaluateFormula(node, {})).toBe(2.5)
  })

  test("divide by zero throws divide_by_zero", () => {
    const node: FormulaNode = {
      type: "binary",
      op: "/",
      left: { type: "number", value: 10 },
      right: { type: "number", value: 0 },
    }
    expectEvalError(() => evaluateFormula(node, {}), "divide_by_zero")
  })

  test("null left operand coerces to 0", () => {
    const ast = parseExpression("prop(missing) / 2")
    expect(evaluateFormula(ast, {})).toBe(0)
  })

  test("null right operand throws divide_by_zero (null coerces to 0)", () => {
    const ast = parseExpression("1 / prop(missing)")
    expectEvalError(() => evaluateFormula(ast, {}), "divide_by_zero")
  })
})

describe("evaluateFormula — binary % (modulo)", () => {
  test("normal modulo", () => {
    const ast = parseExpression("10 % 3")
    expect(evaluateFormula(ast, {})).toBe(1)
  })

  test("zero divisor throws divide_by_zero", () => {
    const ast = parseExpression("10 % 0")
    expectEvalError(() => evaluateFormula(ast, {}), "divide_by_zero")
  })

  test("non-null wrong-shape operand throws arithmetic_nan", () => {
    const ast = parseExpression("prop(s) % 2")
    expectEvalError(() => evaluateFormula(ast, { s: "abc" }), "arithmetic_nan")
  })

  test("null left operand coerces to 0", () => {
    const ast = parseExpression("prop(missing) % 2")
    expect(evaluateFormula(ast, {})).toBe(0)
  })

  test("parses at multiplicative precedence", () => {
    const ast = parseExpression("2 * 10 % 3")
    expect(evaluateFormula(ast, {})).toBe(2)
  })
})

describe("evaluateFormula — nested expressions", () => {
  test("(prop(a) + prop(b)) * 2", () => {
    const node: FormulaNode = {
      type: "binary",
      op: "*",
      left: {
        type: "binary",
        op: "+",
        left: { type: "prop", id: "a" },
        right: { type: "prop", id: "b" },
      },
      right: { type: "number", value: 2 },
    }
    expect(evaluateFormula(node, { a: 3, b: 7 })).toBe(20)
  })
})

describe("evaluateFormula — comparison operators", () => {
  test("1 == 1 → true", () => {
    const ast = parseExpression("1 == 1")
    expect(evaluateFormula(ast, {})).toBe(true)
  })

  test("1 == 2 → false", () => {
    const ast = parseExpression("1 == 2")
    expect(evaluateFormula(ast, {})).toBe(false)
  })

  test("'a' == 'a' → true", () => {
    const ast = parseExpression("'a' == 'a'")
    expect(evaluateFormula(ast, {})).toBe(true)
  })

  test("number != string with equal coerced values → true (no coercion)", () => {
    const ast = parseExpression("prop(x) != prop(y)")
    expect(evaluateFormula(ast, { x: 1, y: "1" })).toBe(true)
  })

  test("null == null → true", () => {
    const ast = parseExpression("prop(missing) == prop(missing)")
    expect(evaluateFormula(ast, {})).toBe(true)
  })

  test("array == array → throws equality_non_scalar", () => {
    const ast = parseExpression("prop(a) == prop(b)")
    expectEvalError(() => evaluateFormula(ast, { a: [1, 2], b: [1, 2] }), "equality_non_scalar")
  })

  test("1 < 2 → true", () => {
    const ast = parseExpression("1 < 2")
    expect(evaluateFormula(ast, {})).toBe(true)
  })

  test("2 < 1 → false", () => {
    const ast = parseExpression("2 < 1")
    expect(evaluateFormula(ast, {})).toBe(false)
  })

  test("1 <= 1 → true", () => {
    const ast = parseExpression("1 <= 1")
    expect(evaluateFormula(ast, {})).toBe(true)
  })

  test("non-null wrong-type operand throws comparison_type_mismatch", () => {
    const ast = parseExpression("prop(s) < 1")
    expectEvalError(() => evaluateFormula(ast, { s: "abc" }), "comparison_type_mismatch")
  })

  test("null operand propagates as null", () => {
    const ast = parseExpression("prop(missing) < 1")
    expect(evaluateFormula(ast, {})).toBeNull()
  })

  test("NaN operand throws comparison_type_mismatch", () => {
    const ast = parseExpression("prop(n) < 1")
    expectEvalError(() => evaluateFormula(ast, { n: Number.NaN }), "comparison_type_mismatch")
  })
})
