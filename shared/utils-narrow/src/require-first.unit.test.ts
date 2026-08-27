import { describe, expect, test } from "bun:test"
import { NarrowError } from "./narrow-error"
import { requireFirst } from "./require-first"

describe("requireFirst", () => {
  test("returns the first element of a single-element array", () => {
    expect(requireFirst(["only"])).toBe("only")
  })

  test("returns the first element of a multi-element array", () => {
    expect(requireFirst([10, 20, 30])).toBe(10)
  })

  test("throws NarrowError on an empty array", () => {
    expect(() => requireFirst([])).toThrow(NarrowError)
  })

  test("error message reports got 0 when no label is supplied", () => {
    expect(() => requireFirst([])).toThrow(/requireFirst: expected at least 1 element(?! in )/)
  })

  test("error message includes the label when supplied", () => {
    expect(() => requireFirst([], "rows")).toThrow(
      "requireFirst: expected at least 1 element in rows, got 0"
    )
  })

  test("returns a legitimately-stored undefined first element", () => {
    const arr: (string | undefined)[] = [undefined, "second"]
    expect(requireFirst(arr)).toBeUndefined()
  })
})
