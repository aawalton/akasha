import { describe, expect, test } from "bun:test"
import {
  SPEEDS,
  speedAfter,
  speedHeld,
  speedShown,
} from "akasha/story/chapter/narration/modules/listening/narration-listening.module.code.ts"

describe("speed", () => {
  test("each tap goes to the next speed, and the fastest goes back to the slowest", () => {
    expect(speedAfter(1)).toBe(1.2)
    expect(speedAfter(1.8)).toBe(2)
    expect(speedAfter(2)).toBe(0.8)
  })

  test("a speed that is no step goes to the slowest", () => {
    expect(speedAfter(1.5)).toBe(0.8)
  })

  test("a kept speed is taken only where it is one of the steps", () => {
    expect(speedHeld("1.4")).toBe(1.4)
    expect(speedHeld(null)).toBe(1)
    expect(speedHeld("3")).toBe(1)
    expect(speedHeld("fast")).toBe(1)
  })

  test("every step is shown as a number with a times sign", () => {
    expect(SPEEDS.map(speedShown)).toEqual(["0.8×", "1×", "1.2×", "1.4×", "1.6×", "1.8×", "2×"])
  })
})
