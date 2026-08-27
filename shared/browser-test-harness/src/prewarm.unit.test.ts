import { describe, expect, test } from "bun:test"
import { decidePrewarmStep } from "./prewarm"

const BASE = { quietMs: 1_500, maxMs: 30_000 }

describe("decidePrewarmStep", () => {
  test("still within a reload burst → wait", () => {
    expect(decidePrewarmStep({ ...BASE, sinceLastNavMs: 200, totalElapsedMs: 6_000 })).toBe("wait")
  })

  test("quiet window reached → warm", () => {
    expect(decidePrewarmStep({ ...BASE, sinceLastNavMs: 1_500, totalElapsedMs: 7_000 })).toBe(
      "warm"
    )
    expect(decidePrewarmStep({ ...BASE, sinceLastNavMs: 4_000, totalElapsedMs: 9_000 })).toBe(
      "warm"
    )
  })

  test("bound reached → giveup, even if a reload just fired", () => {
    expect(decidePrewarmStep({ ...BASE, sinceLastNavMs: 0, totalElapsedMs: 30_000 })).toBe("giveup")
    expect(decidePrewarmStep({ ...BASE, sinceLastNavMs: 5_000, totalElapsedMs: 40_000 })).toBe(
      "giveup"
    )
  })

  test("give-up takes precedence over warm at the exact bound", () => {
    expect(decidePrewarmStep({ ...BASE, sinceLastNavMs: 9_999, totalElapsedMs: 30_000 })).toBe(
      "giveup"
    )
  })

  test("just below the quiet threshold → still wait", () => {
    expect(decidePrewarmStep({ ...BASE, sinceLastNavMs: 1_499, totalElapsedMs: 8_000 })).toBe(
      "wait"
    )
  })
})
