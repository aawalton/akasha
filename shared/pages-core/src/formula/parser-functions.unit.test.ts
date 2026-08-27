import { describe, expect, test } from "bun:test"
import { parseExpression } from "./parser"
import { FormulaParseError } from "./lexer"

describe("parseExpression", () => {
  describe("function calls", () => {
    test("single-arg call", () => {
      const result = parseExpression("toCalendarDate(prop(dueAt))")
      expect(result).toEqual({
        type: "call",
        name: "toCalendarDate",
        args: [{ type: "prop", id: "dueAt" }],
      })
    })

    test("call with literal argument", () => {
      const result = parseExpression("timeOfDay(1700000000000)")
      expect(result).toEqual({
        type: "call",
        name: "timeOfDay",
        args: [{ type: "number", value: 1700000000000 }],
      })
    })

    test("call with arithmetic expression as argument", () => {
      const result = parseExpression("toCalendarDate(prop(a) + 1000)")
      expect(result).toEqual({
        type: "call",
        name: "toCalendarDate",
        args: [
          {
            type: "binary",
            op: "+",
            left: { type: "prop", id: "a" },
            right: { type: "number", value: 1000 },
          },
        ],
      })
    })

    test("call result used in string concatenation", () => {
      const result = parseExpression("'due ' + toCalendarDate(prop(x))")
      expect(result).toEqual({
        type: "binary",
        op: "+",
        left: { type: "string", value: "due " },
        right: {
          type: "call",
          name: "toCalendarDate",
          args: [{ type: "prop", id: "x" }],
        },
      })
    })

    test("unknown function throws", () => {
      expect(() => parseExpression("bogus(1)")).toThrow(FormulaParseError)
      expect(() => parseExpression("bogus(1)")).toThrow(/Unknown function 'bogus'/)
    })

    test("wrong arity throws (too many args)", () => {
      expect(() => parseExpression("toCalendarDate(1, 2)")).toThrow(FormulaParseError)
      expect(() => parseExpression("toCalendarDate(1, 2)")).toThrow(/expects 1 argument but got 2/)
    })

    test("wrong arity throws (no args)", () => {
      expect(() => parseExpression("toCalendarDate()")).toThrow(FormulaParseError)
      expect(() => parseExpression("toCalendarDate()")).toThrow(/expects 1 argument but got 0/)
    })
  })

  describe("error cases", () => {
    test("empty expression", () => {
      expect(() => parseExpression("")).toThrow(FormulaParseError)
      expect(() => parseExpression("")).toThrow(/Empty expression/)
    })

    test("whitespace-only expression", () => {
      expect(() => parseExpression("   ")).toThrow(FormulaParseError)
      expect(() => parseExpression("   ")).toThrow(/Empty expression/)
    })

    test("unexpected character", () => {
      expect(() => parseExpression("@")).toThrow(FormulaParseError)
      expect(() => parseExpression("@")).toThrow(/Unexpected character/)
    })
  })

  describe("namespaced (dotted) refs", () => {
    test("source.title", () => {
      expect(parseExpression("source.title")).toEqual({
        type: "ref",
        path: ["source", "title"],
      })
    })

    test("source.previous.completedAt", () => {
      expect(parseExpression("source.previous.completedAt")).toEqual({
        type: "ref",
        path: ["source", "previous", "completedAt"],
      })
    })

    test("dotted ref in arithmetic expression", () => {
      expect(parseExpression("source.x + 1")).toEqual({
        type: "binary",
        op: "+",
        left: { type: "ref", path: ["source", "x"] },
        right: { type: "number", value: 1 },
      })
    })

    test("dotted ref does not break function call", () => {
      expect(parseExpression("source.dueAt")).toEqual({
        type: "ref",
        path: ["source", "dueAt"],
      })
    })

    test("trailing dot is a parse error", () => {
      expect(() => parseExpression("source.")).toThrow(FormulaParseError)
    })
  })
})
