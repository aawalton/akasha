import { describe, expect, test } from "bun:test"
import {
  classifyRestoreOutcome,
  deriveRestoreResolution,
  formatRestoreOutcome,
  isPerLevelBackfillTarget,
  parsePngDimensions,
  planRetry,
} from "./wallpaper-backfill-execute.module.code.ts"
import {
  notAPngBytes,
  pngHeaderBytes,
  truncatedBytes,
} from "./wallpaper-backfill-execute.module.test-fixtures.ts"

describe("isPerLevelBackfillTarget", () => {
  test("takes a whole level from zero up", () => {
    expect(isPerLevelBackfillTarget(0)).toBe(true)
    expect(isPerLevelBackfillTarget(7)).toBe(true)
  })

  test("passes over a level below zero", () => {
    expect(isPerLevelBackfillTarget(-1)).toBe(false)
  })

  test("passes over a level that is not whole", () => {
    expect(isPerLevelBackfillTarget(1.5)).toBe(false)
  })

  test("passes over no level at all", () => {
    expect(isPerLevelBackfillTarget(null)).toBe(false)
    expect(isPerLevelBackfillTarget(undefined)).toBe(false)
  })
})

describe("deriveRestoreResolution", () => {
  test("takes the shorter of the two sides", () => {
    expect(deriveRestoreResolution({ width: 3440, height: 1440 })).toBe(1440)
    expect(deriveRestoreResolution({ width: 1080, height: 1920 })).toBe(1080)
  })

  test("refuses a side that is not positive", () => {
    expect(() => deriveRestoreResolution({ width: 0, height: 10 })).toThrow()
  })
})

describe("planRetry", () => {
  test("doubles the delay with each attempt", () => {
    const base = { maxAttempts: 5, baseDelayMs: 100, maxDelayMs: 10_000 }
    expect(planRetry({ attempt: 1, ...base })).toEqual({ retry: true, delayMs: 100 })
    expect(planRetry({ attempt: 2, ...base })).toEqual({ retry: true, delayMs: 200 })
    expect(planRetry({ attempt: 3, ...base })).toEqual({ retry: true, delayMs: 400 })
  })

  test("holds the delay at its ceiling", () => {
    expect(planRetry({ attempt: 6, maxAttempts: 10, baseDelayMs: 100, maxDelayMs: 300 })).toEqual({
      retry: true,
      delayMs: 300,
    })
  })

  test("stops once the attempts are spent", () => {
    expect(planRetry({ attempt: 3, maxAttempts: 3, baseDelayMs: 100, maxDelayMs: 10_000 })).toEqual(
      { retry: false, delayMs: 0 }
    )
  })
})

describe("classifyRestoreOutcome", () => {
  test("calls a restore that took one attempt restored", () => {
    expect(classifyRestoreOutcome({ succeeded: true, attempts: 1 })).toEqual({ kind: "restored" })
  })

  test("counts the retries of a restore that took more", () => {
    expect(classifyRestoreOutcome({ succeeded: true, attempts: 3 })).toEqual({
      kind: "retried",
      retries: 2,
    })
  })

  test("calls a restore that never succeeded failed", () => {
    expect(classifyRestoreOutcome({ succeeded: false, attempts: 9 })).toEqual({ kind: "failed" })
  })
})

describe("formatRestoreOutcome", () => {
  test("spells each outcome", () => {
    expect(formatRestoreOutcome({ kind: "restored" })).toBe("restored")
    expect(formatRestoreOutcome({ kind: "retried", retries: 2 })).toBe("retried-2-times")
    expect(formatRestoreOutcome({ kind: "failed" })).toBe("failed")
  })
})

describe("parsePngDimensions", () => {
  test("reads the size out of a PNG header", () => {
    expect(parsePngDimensions(pngHeaderBytes(3440, 1440))).toEqual({ width: 3440, height: 1440 })
  })

  test("refuses bytes too few to hold a header", () => {
    expect(() => parsePngDimensions(truncatedBytes())).toThrow("too short")
  })

  test("refuses bytes that are not a PNG", () => {
    expect(() => parsePngDimensions(notAPngBytes())).toThrow("not a PNG")
  })
})
