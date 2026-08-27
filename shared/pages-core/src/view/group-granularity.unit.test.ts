import { describe, expect, it } from "bun:test"
import { applyGranularityBucket, formatGranularityLabel } from "./group-granularity"

describe("applyGranularityBucket", () => {
  it("returns the exact day for 'none'", () => {
    expect(applyGranularityBucket("2026-06-10", "none")).toBe("2026-06-10")
  })

  it("buckets to the Monday week start for 'week'", () => {
    expect(applyGranularityBucket("2026-06-10", "week")).toBe("2026-06-08")
    expect(applyGranularityBucket("2026-06-14", "week")).toBe("2026-06-08")
  })

  it("buckets to YYYY-MM for 'month'", () => {
    expect(applyGranularityBucket("2026-06-10", "month")).toBe("2026-06")
  })

  it("buckets to YYYY for 'year'", () => {
    expect(applyGranularityBucket("2026-06-10", "year")).toBe("2026")
  })

  it("passes a malformed day string through unchanged", () => {
    expect(applyGranularityBucket("nope", "week")).toBe("nope")
    expect(applyGranularityBucket("nope", "month")).toBe("nope")
    expect(applyGranularityBucket("nope", "year")).toBe("nope")
  })
})

describe("formatGranularityLabel", () => {
  it("labels a week bucket as 'Week of Mon D, YYYY' (abbrev month, unpadded day)", () => {
    expect(formatGranularityLabel("2026-06-08", "week")).toBe("Week of Jun 8, 2026")
  })

  it("labels a month bucket as 'Month YYYY' (full month name)", () => {
    expect(formatGranularityLabel("2026-06", "month")).toBe("June 2026")
  })

  it("labels a year bucket as the year", () => {
    expect(formatGranularityLabel("2026", "year")).toBe("2026")
  })

  it("defers to the smart-date formatter for 'none'", () => {
    expect(formatGranularityLabel("2000-03-05", "none")).toBe("05 Mar 2000")
  })

  it("passes a malformed bucket key through unchanged", () => {
    expect(formatGranularityLabel("nope", "week")).toBe("nope")
    expect(formatGranularityLabel("nope", "month")).toBe("nope")
  })
})
