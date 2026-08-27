import { describe, expect, test } from "bun:test"
import { decideTotalPointsWrite } from "./totals"

describe("decideTotalPointsWrite", () => {
  test("writes when no value is stored", () => {
    expect(decideTotalPointsWrite(undefined, 100)).toBe(100)
  })

  test("writes when the computed value is greater (high-water)", () => {
    expect(decideTotalPointsWrite(50, 100)).toBe(100)
  })

  test("skips when the computed value equals the stored value", () => {
    expect(decideTotalPointsWrite(100, 100)).toBeNull()
  })

  test("skips when the computed value is lower — earnings only go up", () => {
    expect(decideTotalPointsWrite(100, 99)).toBeNull()
  })

  test("writes a measured zero over an absent value", () => {
    expect(decideTotalPointsWrite(undefined, 0)).toBe(0)
  })

  test("force writes a lower computed value over a higher stored value", () => {
    expect(decideTotalPointsWrite(100, 99, true)).toBe(99)
  })

  test("force writes an equal value (always a write)", () => {
    expect(decideTotalPointsWrite(100, 100, true)).toBe(100)
  })

  test("force writes over an absent value", () => {
    expect(decideTotalPointsWrite(undefined, 42, true)).toBe(42)
  })
})
