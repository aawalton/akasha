import { describe, expect, test } from "bun:test"
import { decideReadEndFire } from "./read-end"

describe("decideReadEndFire", () => {
  test("fires when gated on, callback present, intersecting, and not yet fired", () => {
    expect(
      decideReadEndFire({
        markReadOnEnd: true,
        hasCallback: true,
        isIntersecting: true,
        alreadyFired: false,
      })
    ).toBe(true)
  })

  test("does not fire when the opt-in is off", () => {
    expect(
      decideReadEndFire({
        markReadOnEnd: false,
        hasCallback: true,
        isIntersecting: true,
        alreadyFired: false,
      })
    ).toBe(false)
  })

  test("does not fire without a callback", () => {
    expect(
      decideReadEndFire({
        markReadOnEnd: true,
        hasCallback: false,
        isIntersecting: true,
        alreadyFired: false,
      })
    ).toBe(false)
  })

  test("does not fire when the sentinel is not intersecting", () => {
    expect(
      decideReadEndFire({
        markReadOnEnd: true,
        hasCallback: true,
        isIntersecting: false,
        alreadyFired: false,
      })
    ).toBe(false)
  })

  test("fires at most once per view — no re-fire after the first", () => {
    expect(
      decideReadEndFire({
        markReadOnEnd: true,
        hasCallback: true,
        isIntersecting: true,
        alreadyFired: true,
      })
    ).toBe(false)
  })
})
