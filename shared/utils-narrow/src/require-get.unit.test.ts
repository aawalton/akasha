import { describe, expect, test } from "bun:test"
import { NarrowError } from "./narrow-error"
import { requireGet } from "./require-get"

describe("requireGet", () => {
  test("returns the value for a present key", () => {
    const map = new Map<string, number>([
      ["a", 1],
      ["b", 2],
    ])
    expect(requireGet(map, "b")).toBe(2)
  })

  test("returns a legitimately-stored undefined value (does not treat as missing)", () => {
    const map = new Map<string, number | undefined>([["x", undefined]])
    expect(requireGet(map, "x")).toBeUndefined()
  })

  test("throws NarrowError when the key is missing", () => {
    const map = new Map<string, number>([["a", 1]])
    expect(() => requireGet(map, "missing")).toThrow(NarrowError)
  })

  test("error message names the missing key when no label is supplied", () => {
    const map = new Map<string, number>()
    expect(() => requireGet(map, "abc")).toThrow(/requireGet: missing key abc(?! in )/)
  })

  test("error message includes the label when supplied", () => {
    const map = new Map<string, number>()
    expect(() => requireGet(map, "abc", "user-cache")).toThrow(
      "requireGet: missing key abc in user-cache"
    )
  })

  test("matches Map's SameValueZero semantics for NaN keys", () => {
    const map = new Map<number, string>([[Number.NaN, "nan-value"]])
    expect(requireGet(map, Number.NaN)).toBe("nan-value")
  })
})
