import { expect, test } from "bun:test"
import { effectiveScore, type RecencyPolicy, recencyBonus } from "./movement-recency.module.code.ts"

const POLICY: RecencyPolicy = { recencyWeight: 0.05, recencySaturationDays: 20 }

const TODAY = "2026-07-25"

test("a movement never performed gains nothing", () => {
  expect(recencyBonus(null, TODAY, POLICY)).toBe(0)
})

test("a movement performed today gains nothing", () => {
  expect(recencyBonus(TODAY, TODAY, POLICY)).toBe(0)
})

test("a day recorded ahead of today gains nothing", () => {
  expect(recencyBonus("2026-07-30", TODAY, POLICY)).toBe(0)
})

test("the gain rises with the days since", () => {
  const five = recencyBonus("2026-07-20", TODAY, POLICY)
  const ten = recencyBonus("2026-07-15", TODAY, POLICY)
  expect(five).toBeCloseTo(0.0125, 10)
  expect(ten).toBeCloseTo(0.025, 10)
  expect(ten).toBeGreaterThan(five)
})

test("the gain stops at the saturation day", () => {
  expect(recencyBonus("2026-07-05", TODAY, POLICY)).toBeCloseTo(0.05, 10)
  expect(recencyBonus("2025-01-01", TODAY, POLICY)).toBeCloseTo(0.05, 10)
})

test("a saturation of no days turns the gain off", () => {
  const off: RecencyPolicy = { recencyWeight: 0.05, recencySaturationDays: 0 }
  expect(recencyBonus("2026-01-01", TODAY, off)).toBe(0)
})

test("a weight of nothing turns the gain off", () => {
  const off: RecencyPolicy = { recencyWeight: 0, recencySaturationDays: 20 }
  expect(recencyBonus("2026-01-01", TODAY, off)).toBe(0)
})

test("the gain is added to the blend", () => {
  expect(effectiveScore(0.4, 0.05)).toBeCloseTo(0.45, 10)
  expect(effectiveScore(0.4, 0)).toBe(0.4)
})
