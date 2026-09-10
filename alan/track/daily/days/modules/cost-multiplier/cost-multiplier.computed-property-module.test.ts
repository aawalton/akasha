import { expect, test } from "bun:test"
import { gapIn, multiplierFor } from "./cost-multiplier.computed-property-module.code.ts"

test("the gap a cost is read from is the safety level less the difficulty level", () => {
  expect(gapIn({ safetyLevel: 3, difficultyLevel: 4 })).toBe(-1)
  expect(gapIn({ safetyLevel: "4.5", difficultyLevel: "3" })).toBe(1.5)
})

test("a stretch a full level inside the safety level costs nothing", () => {
  expect(multiplierFor(1)).toBe(0)
  expect(multiplierFor(2.5)).toBe(0)
})

test("a stretch at the safety level costs one hour for each hour it ran", () => {
  expect(multiplierFor(0)).toBe(1)
})

test("each level the gap falls beneath the match roughly doubles the cost", () => {
  expect(multiplierFor(-1)).toBe(2)
  expect(multiplierFor(-2)).toBe(4)
  expect(multiplierFor(-3)).toBe(8)
  expect(multiplierFor(-4)).toBe(16)
  expect(multiplierFor(-5)).toBe(32)
  expect(multiplierFor(-9)).toBe(32)
})

test("a gap is read at the nearest half step, which is the finest step a level moves in", () => {
  expect(multiplierFor(-0.5)).toBe(1.5)
  expect(multiplierFor(-1.5)).toBe(3)
  expect(multiplierFor(-2.5)).toBe(6)
  expect(multiplierFor(-3.5)).toBe(12)
  expect(multiplierFor(-4.5)).toBe(24)
  expect(multiplierFor(-1.585)).toBe(3)
  expect(multiplierFor(-1.2)).toBe(2)
  expect(multiplierFor(-4.7)).toBe(24)
  expect(multiplierFor(-0.1)).toBe(1)
})

test("a stretch stating no safety level or no difficulty level costs nothing", () => {
  expect(gapIn({ safetyLevel: 3 })).toBeNull()
  expect(gapIn({ difficultyLevel: 3 })).toBeNull()
  expect(gapIn({ safetyLevel: "", difficultyLevel: 3 })).toBeNull()
  expect(multiplierFor(null)).toBe(0)
})
