import { describe, expect, it } from "bun:test"
import {
  clampFraction,
  decideReadRestore,
  decideRestoreReady,
  fractionToScrollTop,
  fractionToTime,
  POSITION_RESUME_MIN_FRACTION,
  resolveResumeFraction,
  timeToFraction,
} from "./position-fraction"

describe("clampFraction", () => {
  it("clamps to [0,1]", () => {
    expect(clampFraction(-0.5)).toBe(0)
    expect(clampFraction(0)).toBe(0)
    expect(clampFraction(0.4)).toBe(0.4)
    expect(clampFraction(1)).toBe(1)
    expect(clampFraction(1.7)).toBe(1)
  })
  it("maps non-finite to 0", () => {
    expect(clampFraction(Number.NaN)).toBe(0)
    expect(clampFraction(Number.POSITIVE_INFINITY)).toBe(0)
  })
})

describe("timeToFraction", () => {
  it("maps currentTime/duration, clamped", () => {
    expect(timeToFraction(30, 120)).toBe(0.25)
    expect(timeToFraction(120, 120)).toBe(1)
    expect(timeToFraction(200, 120)).toBe(1)
  })
  it("guards a non-positive or non-finite duration → 0", () => {
    expect(timeToFraction(30, 0)).toBe(0)
    expect(timeToFraction(30, Number.NaN)).toBe(0)
    expect(timeToFraction(30, Number.POSITIVE_INFINITY)).toBe(0)
  })
})

describe("fractionToTime", () => {
  it("maps fraction*duration", () => {
    expect(fractionToTime(0.25, 120)).toBe(30)
    expect(fractionToTime(1, 120)).toBe(120)
  })
  it("clamps the fraction first and guards duration", () => {
    expect(fractionToTime(1.5, 120)).toBe(120)
    expect(fractionToTime(0.5, 0)).toBe(0)
    expect(fractionToTime(0.5, Number.NaN)).toBe(0)
  })
})

describe("fractionToScrollTop", () => {
  it("maps fraction*scrollable", () => {
    expect(fractionToScrollTop(0.4, 1000)).toBe(400)
    expect(fractionToScrollTop(1, 1000)).toBe(1000)
  })
  it("guards a non-positive/non-finite scrollable → 0", () => {
    expect(fractionToScrollTop(0.4, 0)).toBe(0)
    expect(fractionToScrollTop(0.4, -50)).toBe(0)
    expect(fractionToScrollTop(0.4, Number.NaN)).toBe(0)
  })
})

describe("resolveResumeFraction — read-back precedence", () => {
  it("prefers the local store when present (fresher / offline-durable)", () => {
    expect(resolveResumeFraction({ localFraction: 0.6, rowFraction: 0.3 })).toBe(0.6)
  })
  it("falls back to the row when there is no local entry (cross-device / web)", () => {
    expect(resolveResumeFraction({ localFraction: undefined, rowFraction: 0.3 })).toBe(0.3)
  })
  it("returns undefined (→ top) when neither is set", () => {
    expect(
      resolveResumeFraction({ localFraction: undefined, rowFraction: undefined })
    ).toBeUndefined()
  })
  it("ignores non-finite candidates", () => {
    expect(resolveResumeFraction({ localFraction: Number.NaN, rowFraction: 0.3 })).toBe(0.3)
    expect(
      resolveResumeFraction({ localFraction: undefined, rowFraction: Number.POSITIVE_INFINITY })
    ).toBeUndefined()
  })
  it("clamps a resolved out-of-range value", () => {
    expect(resolveResumeFraction({ localFraction: 1.4, rowFraction: undefined })).toBe(1)
  })
})

describe("decideReadRestore", () => {
  it("restores for a strictly-partial fraction above the min threshold", () => {
    expect(decideReadRestore(0.4)).toBe(0.4)
    expect(decideReadRestore(0.95)).toBe(0.95)
  })
  it("stays at top for unset / near-zero values", () => {
    expect(decideReadRestore(undefined)).toBeUndefined()
    expect(decideReadRestore(0)).toBeUndefined()
    expect(decideReadRestore(POSITION_RESUME_MIN_FRACTION)).toBeUndefined()
    expect(decideReadRestore(0.005)).toBeUndefined()
  })
  it("has NO upper cut-off — a near-end value still restores (last-viewed, no snap)", () => {
    expect(decideReadRestore(0.99)).toBe(0.99)
    expect(decideReadRestore(1)).toBe(1)
  })
  it("ignores a non-finite fraction", () => {
    expect(decideReadRestore(Number.NaN)).toBeUndefined()
  })
})

describe("decideRestoreReady — restore-arm gate (#15087)", () => {
  const base = { pagePresent: true, isLoading: false, localLoaded: true, bodyPresent: true }
  it("arms when the page is resolved, not loading, local read done, and body present", () => {
    expect(decideRestoreReady(base)).toBe(true)
  })
  it("does NOT arm against an empty body — the light content-tier mirror window", () => {
    expect(decideRestoreReady({ ...base, bodyPresent: false })).toBe(false)
  })
  it("does not arm while loading (skeleton), page absent, or local read pending", () => {
    expect(decideRestoreReady({ ...base, isLoading: true })).toBe(false)
    expect(decideRestoreReady({ ...base, pagePresent: false })).toBe(false)
    expect(decideRestoreReady({ ...base, localLoaded: false })).toBe(false)
  })
})
