import { expect, test } from "bun:test"
import { multiplierIn } from "./cost-multiplier.readout.code.ts"

test("the reading is the multiplier the block's safety and difficulty price it at", () => {
  expect(multiplierIn({ safetyLevel: "3", difficultyLevel: "2" })).toBe(0)
  expect(multiplierIn({ safetyLevel: "3", difficultyLevel: "3" })).toBe(1)
  expect(multiplierIn({ safetyLevel: "2.5", difficultyLevel: "3.5" })).toBe(2)
})

test("a block missing either level is no reading rather than a cost of zero", () => {
  expect(multiplierIn({ safetyLevel: "3" })).toBeNull()
  expect(multiplierIn({ difficultyLevel: "3" })).toBeNull()
  expect(multiplierIn({})).toBeNull()
})
