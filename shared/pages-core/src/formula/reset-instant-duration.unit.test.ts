import { describe, expect, test } from "bun:test"
import { getEsoDayStr, getEsoResetTime } from "../../../../day/day"
import type { ReadonlyJSONValue } from "../schema/pages"
import { evaluateFormula } from "./evaluate"
import { parseExpression } from "./parser"

const DAILY_DURATION_EXPR =
  "86400 - ((date == today()) && (86400 - (now() - resetInstant()) / 1000))"

function evalExpr(expr: string, values: Record<string, ReadonlyJSONValue>): ReadonlyJSONValue {
  return evaluateFormula(parseExpression(expr), values)
}

describe("Daily Tracking durationSeconds formula", () => {
  test("parses (resetInstant is a registered builtin)", () => {
    expect(() => parseExpression(DAILY_DURATION_EXPR)).not.toThrow()
  })

  test("a past day evaluates to exactly 86400 (24 hours)", () => {
    expect(evalExpr(DAILY_DURATION_EXPR, { date: "2000-01-01" })).toBe(86400)
  })

  test("a future day evaluates to exactly 86400 (24 hours)", () => {
    expect(evalExpr(DAILY_DURATION_EXPR, { date: "2999-01-01" })).toBe(86400)
  })

  test("today evaluates to elapsed seconds since the ESO reset", () => {
    const todayStr = getEsoDayStr(new Date())
    const result = evalExpr(DAILY_DURATION_EXPR, { date: todayStr })
    const expected = (Date.now() - getEsoResetTime(new Date()).getTime()) / 1000
    expect(typeof result).toBe("number")
    if (typeof result !== "number") throw new Error("expected number")
    expect(Math.abs(result - expected)).toBeLessThanOrEqual(5)
    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThanOrEqual(25 * 60 * 60)
  })
})
