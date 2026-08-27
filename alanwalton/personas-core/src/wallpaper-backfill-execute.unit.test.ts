import { describe, expect, it } from "bun:test"
import {
  classifyRestoreOutcome,
  deriveRestoreResolution,
  formatRestoreOutcome,
  isPerLevelBackfillTarget,
  parsePngDimensions,
  planRetry,
} from "./wallpaper-backfill-execute"

function pngHeader(width: number, height: number): Uint8Array {
  const buf = new Uint8Array(24)
  buf.set([137, 80, 78, 71, 13, 10, 26, 10], 0)
  buf.set([73, 72, 68, 82], 12)
  const view = new DataView(buf.buffer)
  view.setUint32(16, width, false)
  view.setUint32(20, height, false)
  return buf
}

describe("isPerLevelBackfillTarget", () => {
  it("includes a row with a numeric relationshipLevel", () => {
    expect(isPerLevelBackfillTarget(1)).toBe(true)
    expect(isPerLevelBackfillTarget(2)).toBe(true)
    expect(isPerLevelBackfillTarget(0)).toBe(true)
  })

  it("excludes a null-level row (the aria-mari-dnd scene specials)", () => {
    expect(isPerLevelBackfillTarget(null)).toBe(false)
    expect(isPerLevelBackfillTarget(undefined)).toBe(false)
  })

  it("excludes a non-integer or negative level (malformed row)", () => {
    expect(isPerLevelBackfillTarget(1.5)).toBe(false)
    expect(isPerLevelBackfillTarget(-1)).toBe(false)
  })
})

describe("deriveRestoreResolution", () => {
  it("returns the short side of a 3440x1440 landscape wallpaper (1x native)", () => {
    expect(deriveRestoreResolution({ width: 3440, height: 1440 })).toBe(1440)
  })

  it("returns the short side regardless of orientation", () => {
    expect(deriveRestoreResolution({ width: 1440, height: 3440 })).toBe(1440)
    expect(deriveRestoreResolution({ width: 2000, height: 2000 })).toBe(2000)
  })

  it("throws on a non-positive dimension", () => {
    expect(() => deriveRestoreResolution({ width: 0, height: 1440 })).toThrow()
    expect(() => deriveRestoreResolution({ width: 3440, height: -1 })).toThrow()
  })
})

describe("planRetry", () => {
  const base = { baseDelayMs: 10_000, maxDelayMs: 120_000 }
  it("retries with exponential backoff while attempts remain", () => {
    expect(planRetry({ attempt: 1, maxAttempts: 5, ...base })).toEqual({
      retry: true,
      delayMs: 10_000,
    })
    expect(planRetry({ attempt: 2, maxAttempts: 5, ...base })).toEqual({
      retry: true,
      delayMs: 20_000,
    })
    expect(planRetry({ attempt: 3, maxAttempts: 5, ...base })).toEqual({
      retry: true,
      delayMs: 40_000,
    })
  })

  it("caps the delay at maxDelayMs", () => {
    expect(planRetry({ attempt: 6, maxAttempts: 99, ...base }).delayMs).toBe(120_000)
  })

  it("does not retry once the final attempt has failed", () => {
    expect(planRetry({ attempt: 5, maxAttempts: 5, ...base })).toEqual({
      retry: false,
      delayMs: 0,
    })
  })
})

describe("parsePngDimensions", () => {
  it("reads width/height from a 3440x1440 PNG IHDR", () => {
    expect(parsePngDimensions(pngHeader(3440, 1440))).toEqual({ width: 3440, height: 1440 })
  })

  it("throws on a truncated buffer", () => {
    expect(() => parsePngDimensions(new Uint8Array(10))).toThrow()
  })

  it("throws on a non-PNG signature", () => {
    const notPng = pngHeader(100, 100)
    notPng[0] = 0
    expect(() => parsePngDimensions(notPng)).toThrow()
  })
})

describe("classifyRestoreOutcome / formatRestoreOutcome", () => {
  it("classifies a first-attempt success as restored", () => {
    const o = classifyRestoreOutcome({ succeeded: true, attempts: 1 })
    expect(o).toEqual({ kind: "restored" })
    expect(formatRestoreOutcome(o)).toBe("restored")
  })

  it("classifies a success after retries as retried-N-times", () => {
    const o = classifyRestoreOutcome({ succeeded: true, attempts: 3 })
    expect(o).toEqual({ kind: "retried", retries: 2 })
    expect(formatRestoreOutcome(o)).toBe("retried-2-times")
  })

  it("classifies a run that never succeeded as failed", () => {
    const o = classifyRestoreOutcome({ succeeded: false, attempts: 5 })
    expect(o).toEqual({ kind: "failed" })
    expect(formatRestoreOutcome(o)).toBe("failed")
  })
})
