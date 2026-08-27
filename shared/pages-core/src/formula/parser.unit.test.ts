import { describe, expect, test } from "bun:test"
import { parseExpression } from "./parser"
import { FormulaParseError } from "./lexer"

describe("parseExpression", () => {
  describe("valid number literals", () => {
    test("integer", () => {
      const result = parseExpression("42")
      expect(result).toEqual({ type: "number", value: 42 })
    })

    test("decimal", () => {
      const result = parseExpression("3.14")
      expect(result).toEqual({ type: "number", value: 3.14 })
    })

    test("trailing dot", () => {
      const result = parseExpression("1.")
      expect(result).toEqual({ type: "number", value: 1 })
    })
  })

  describe("malformed number literals", () => {
    test("multiple dots: 1.2.3", () => {
      expect(() => parseExpression("1.2.3")).toThrow(FormulaParseError)
      expect(() => parseExpression("1.2.3")).toThrow(/Malformed number literal/)
    })

    test("double dot: 1..2", () => {
      expect(() => parseExpression("1..2")).toThrow(FormulaParseError)
      expect(() => parseExpression("1..2")).toThrow(/Malformed number literal/)
    })

    test("many dots: 1.2.3.4", () => {
      expect(() => parseExpression("1.2.3.4")).toThrow(FormulaParseError)
      expect(() => parseExpression("1.2.3.4")).toThrow(/Malformed number literal/)
    })

    test("error includes position", () => {
      expect(() => parseExpression("1.2.3")).toThrow(/position 0/)
    })

    test("error includes position for offset literal", () => {
      expect(() => parseExpression("1 + 1.2.3")).toThrow(/position 4/)
    })
  })

  describe("string literals", () => {
    test("double-quoted string", () => {
      const result = parseExpression('"hello"')
      expect(result).toEqual({ type: "string", value: "hello" })
    })

    test("single-quoted string", () => {
      const result = parseExpression("'world'")
      expect(result).toEqual({ type: "string", value: "world" })
    })

    test("unterminated string throws", () => {
      expect(() => parseExpression('"hello')).toThrow(FormulaParseError)
      expect(() => parseExpression('"hello')).toThrow(/Unterminated string literal/)
    })
  })

  describe("prop references", () => {
    test("basic prop reference", () => {
      const result = parseExpression("prop(abc)")
      expect(result).toEqual({ type: "prop", id: "abc" })
    })

    test("prop reference with whitespace in id", () => {
      const result = parseExpression("prop( abc )")
      expect(result).toEqual({ type: "prop", id: "abc" })
    })
  })

  describe("reserved-identifier literals", () => {
    test("null literal", () => {
      expect(parseExpression("null")).toEqual({ type: "null" })
    })

    test("true literal", () => {
      expect(parseExpression("true")).toEqual({ type: "boolean", value: true })
    })

    test("false literal", () => {
      expect(parseExpression("false")).toEqual({ type: "boolean", value: false })
    })

    test("null in equality", () => {
      const node = parseExpression("source.rrule != null")
      expect(node).toEqual({
        type: "binary",
        op: "!=",
        left: { type: "ref", path: ["source", "rrule"] },
        right: { type: "null" },
      })
    })
  })
})
