import { describe, expect, test } from "bun:test"
import { NarrowError } from "./narrow-error"
import { requireOnly } from "./require-only"

describe("requireOnly", () => {
  test("returns the sole element of a single-element array", () => {
    expect(requireOnly([42])).toBe(42)
  })

  test("throws NarrowError on an empty array", () => {
    expect(() => requireOnly([])).toThrow(NarrowError)
  })

  test("throws NarrowError on a multi-element array", () => {
    expect(() => requireOnly([1, 2, 3])).toThrow(NarrowError)
  })

  test("error message names the actual length on mismatch", () => {
    expect(() => requireOnly([1, 2])).toThrow("requireOnly: expected exactly 1 element, got 2")
  })

  test("error message includes the label when supplied", () => {
    expect(() => requireOnly([], "matches")).toThrow(
      "requireOnly: expected exactly 1 element in matches, got 0"
    )
  })

  test("returns a legitimately-stored undefined element when array is [undefined]", () => {
    const arr: (number | undefined)[] = [undefined]
    expect(requireOnly(arr)).toBeUndefined()
  })
})
