import { describe, expect, test } from "bun:test"
import { assertNever } from "./assert-never"
import { NarrowError } from "./narrow-error"

const callAssertNever = (value: unknown): unknown => Reflect.apply(assertNever, undefined, [value])

describe("assertNever", () => {
  test("throws NarrowError when called", () => {
    expect(() => callAssertNever("unhandled")).toThrow(NarrowError)
  })

  test("error message names the offending string value", () => {
    expect(() => callAssertNever("badVariant")).toThrow(/assertNever/)
    expect(() => callAssertNever("badVariant")).toThrow(/badVariant/)
  })

  test("renders non-string values via JSON.stringify", () => {
    expect(() => callAssertNever({ kind: "x", n: 1 })).toThrow(/"kind"/)
  })

  test("renders undefined as the literal string", () => {
    expect(() => callAssertNever(undefined)).toThrow(/undefined/)
  })

  test("type signature accepts only never (compile-time check)", () => {
    type Color = "red" | "green" | "blue"
    function describe(c: Color): string {
      switch (c) {
        case "red":
          return "R"
        case "green":
          return "G"
        case "blue":
          return "B"
        default:
          return assertNever(c)
      }
    }
    expect(describe("red")).toBe("R")
    expect(describe("green")).toBe("G")
    expect(describe("blue")).toBe("B")
  })
})
