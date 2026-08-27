import { describe, expect, test } from "bun:test"
import { nullOrderSign } from "./null-ordering"

describe("nullOrderSign — direction-aware null placement", () => {
  test("null on the left sorts first on asc, last on desc", () => {
    expect(nullOrderSign(true, false)).toBe(-1)
    expect(nullOrderSign(true, true)).toBe(1)
  })

  test("null on the right sorts first on asc, last on desc", () => {
    expect(nullOrderSign(false, false)).toBe(1)
    expect(nullOrderSign(false, true)).toBe(-1)
  })

  test("asc and desc are exact inverses for either side", () => {
    expect(nullOrderSign(true, false)).toBe(-nullOrderSign(true, true))
    expect(nullOrderSign(false, false)).toBe(-nullOrderSign(false, true))
  })
})
