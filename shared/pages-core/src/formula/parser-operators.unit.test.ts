import { describe, expect, test } from "bun:test"
import { parseExpression } from "./parser"

describe("parseExpression", () => {
  describe("arithmetic expressions", () => {
    test("addition", () => {
      const result = parseExpression("1 + 2")
      expect(result).toEqual({
        type: "binary",
        op: "+",
        left: { type: "number", value: 1 },
        right: { type: "number", value: 2 },
      })
    })

    test("multiplication", () => {
      const result = parseExpression("3 * 4")
      expect(result).toEqual({
        type: "binary",
        op: "*",
        left: { type: "number", value: 3 },
        right: { type: "number", value: 4 },
      })
    })

    test("operator precedence: multiplication before addition", () => {
      const result = parseExpression("1 + 2 * 3")
      expect(result).toEqual({
        type: "binary",
        op: "+",
        left: { type: "number", value: 1 },
        right: {
          type: "binary",
          op: "*",
          left: { type: "number", value: 2 },
          right: { type: "number", value: 3 },
        },
      })
    })

    test("parenthesized expression", () => {
      const result = parseExpression("(1 + 2) * 3")
      expect(result).toEqual({
        type: "binary",
        op: "*",
        left: {
          type: "binary",
          op: "+",
          left: { type: "number", value: 1 },
          right: { type: "number", value: 2 },
        },
        right: { type: "number", value: 3 },
      })
    })
  })

  describe("unary minus", () => {
    test("negative number", () => {
      const result = parseExpression("-5")
      expect(result).toEqual({
        type: "unary_minus",
        operand: { type: "number", value: 5 },
      })
    })
  })

  describe("comparison operators", () => {
    test("==", () => {
      expect(parseExpression("1 == 2")).toEqual({
        type: "binary",
        op: "==",
        left: { type: "number", value: 1 },
        right: { type: "number", value: 2 },
      })
    })

    test("!=", () => {
      expect(parseExpression("1 != 2")).toEqual({
        type: "binary",
        op: "!=",
        left: { type: "number", value: 1 },
        right: { type: "number", value: 2 },
      })
    })

    test("<", () => {
      expect(parseExpression("1 < 2")).toEqual({
        type: "binary",
        op: "<",
        left: { type: "number", value: 1 },
        right: { type: "number", value: 2 },
      })
    })

    test(">", () => {
      expect(parseExpression("3 > 2")).toEqual({
        type: "binary",
        op: ">",
        left: { type: "number", value: 3 },
        right: { type: "number", value: 2 },
      })
    })

    test("<=", () => {
      expect(parseExpression("1 <= 2")).toEqual({
        type: "binary",
        op: "<=",
        left: { type: "number", value: 1 },
        right: { type: "number", value: 2 },
      })
    })

    test(">=", () => {
      expect(parseExpression("3 >= 2")).toEqual({
        type: "binary",
        op: ">=",
        left: { type: "number", value: 3 },
        right: { type: "number", value: 2 },
      })
    })

    test("comparison binds tighter than equality", () => {
      expect(parseExpression("1 < 2 == 3 < 4")).toEqual({
        type: "binary",
        op: "==",
        left: {
          type: "binary",
          op: "<",
          left: { type: "number", value: 1 },
          right: { type: "number", value: 2 },
        },
        right: {
          type: "binary",
          op: "<",
          left: { type: "number", value: 3 },
          right: { type: "number", value: 4 },
        },
      })
    })

    test("additive binds tighter than comparison", () => {
      expect(parseExpression("1 + 2 < 3 + 4")).toEqual({
        type: "binary",
        op: "<",
        left: {
          type: "binary",
          op: "+",
          left: { type: "number", value: 1 },
          right: { type: "number", value: 2 },
        },
        right: {
          type: "binary",
          op: "+",
          left: { type: "number", value: 3 },
          right: { type: "number", value: 4 },
        },
      })
    })
  })

  describe("logical operators", () => {
    test("&&", () => {
      expect(parseExpression("1 && 2")).toEqual({
        type: "binary",
        op: "&&",
        left: { type: "number", value: 1 },
        right: { type: "number", value: 2 },
      })
    })

    test("||", () => {
      expect(parseExpression("1 || 2")).toEqual({
        type: "binary",
        op: "||",
        left: { type: "number", value: 1 },
        right: { type: "number", value: 2 },
      })
    })

    test("&& binds tighter than ||", () => {
      expect(parseExpression("1 || 2 && 3")).toEqual({
        type: "binary",
        op: "||",
        left: { type: "number", value: 1 },
        right: {
          type: "binary",
          op: "&&",
          left: { type: "number", value: 2 },
          right: { type: "number", value: 3 },
        },
      })
    })

    test("equality binds tighter than &&", () => {
      expect(parseExpression("1 == 2 && 3 == 4")).toEqual({
        type: "binary",
        op: "&&",
        left: {
          type: "binary",
          op: "==",
          left: { type: "number", value: 1 },
          right: { type: "number", value: 2 },
        },
        right: {
          type: "binary",
          op: "==",
          left: { type: "number", value: 3 },
          right: { type: "number", value: 4 },
        },
      })
    })

    test("unary !", () => {
      expect(parseExpression("!1")).toEqual({
        type: "unary_not",
        operand: { type: "number", value: 1 },
      })
    })

    test("unary ! has higher precedence than &&", () => {
      expect(parseExpression("!1 && 2")).toEqual({
        type: "binary",
        op: "&&",
        left: { type: "unary_not", operand: { type: "number", value: 1 } },
        right: { type: "number", value: 2 },
      })
    })

    test("nested unary !!x", () => {
      expect(parseExpression("!!1")).toEqual({
        type: "unary_not",
        operand: { type: "unary_not", operand: { type: "number", value: 1 } },
      })
    })
  })
})
