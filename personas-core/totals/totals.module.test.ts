import { describe, expect, test } from "bun:test"
import { decideTotalPointsWrite } from "./totals.module.code.ts"

describe("decideTotalPointsWrite", () => {
  test("takes the computed total where nothing is stored yet", () => {
    expect(decideTotalPointsWrite(undefined, 5)).toBe(5)
  })

  test("writes a total greater than the one stored", () => {
    expect(decideTotalPointsWrite(5, 10)).toBe(10)
  })

  test("answers nothing where the stored total is greater", () => {
    expect(decideTotalPointsWrite(10, 5)).toBeNull()
  })

  test("answers nothing where the totals are equal", () => {
    expect(decideTotalPointsWrite(5, 5)).toBeNull()
  })

  test("replaces a greater stored total when forced", () => {
    expect(decideTotalPointsWrite(10, 5, true)).toBe(5)
  })
})
