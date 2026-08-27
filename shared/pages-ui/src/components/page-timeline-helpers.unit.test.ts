import { describe, expect, it } from "bun:test"
import {
  buildTimelineLayout,
  parseTimelineDateMs,
  rowsToTimelineInputs,
} from "./page-timeline-helpers"

const DAY_MS = 86_400_000

describe("parseTimelineDateMs", () => {
  it("parses a YYYY-MM-DD calendar-date as UTC midnight", () => {
    expect(parseTimelineDateMs("2026-06-20")).toBe(Date.parse("2026-06-20T00:00:00Z"))
  })

  it("passes a finite number (instant ms-epoch) through unchanged", () => {
    expect(parseTimelineDateMs(1_700_000_000_000)).toBe(1_700_000_000_000)
  })

  it("parses a full ISO datetime string", () => {
    expect(parseTimelineDateMs("2026-06-20T12:30:00Z")).toBe(Date.parse("2026-06-20T12:30:00Z"))
  })

  it("returns null for empty, missing, or unparseable values", () => {
    expect(parseTimelineDateMs(undefined)).toBeNull()
    expect(parseTimelineDateMs("")).toBeNull()
    expect(parseTimelineDateMs("not-a-date")).toBeNull()
    expect(parseTimelineDateMs(Number.NaN)).toBeNull()
    expect(parseTimelineDateMs(true)).toBeNull()
    expect(parseTimelineDateMs(null)).toBeNull()
  })
})

describe("rowsToTimelineInputs", () => {
  it("extracts start (and optional end) ms from the named properties", () => {
    const rows = [
      { _id: "a", begins: "2026-06-01", ends: "2026-06-10" },
      { _id: "b", begins: "2026-06-05" },
    ] as const
    const inputs = rowsToTimelineInputs(rows, "begins", "ends")
    expect(inputs).toEqual([
      {
        id: "a",
        startMs: Date.parse("2026-06-01T00:00:00Z"),
        endMs: Date.parse("2026-06-10T00:00:00Z"),
      },
      { id: "b", startMs: Date.parse("2026-06-05T00:00:00Z"), endMs: null },
    ])
  })

  it("leaves end null when no end property is given", () => {
    const rows = [{ _id: "a", begins: "2026-06-01" }] as const
    expect(rowsToTimelineInputs(rows, "begins")[0]?.endMs).toBeNull()
  })
})

describe("buildTimelineLayout", () => {
  it("returns a null domain and lists undated rows when nothing is datable", () => {
    const layout = buildTimelineLayout([
      { id: "a", startMs: null, endMs: null },
      { id: "b", startMs: null, endMs: null },
    ])
    expect(layout.domain).toBeNull()
    expect(layout.bars).toEqual([])
    expect(layout.undatedIds).toEqual(["a", "b"])
  })

  it("positions a range bar at the correct left/width percentages", () => {
    const start = Date.parse("2026-06-01T00:00:00Z")
    const end = Date.parse("2026-06-11T00:00:00Z")
    const layout = buildTimelineLayout([{ id: "a", startMs: start, endMs: end }])
    expect(layout.domain).toEqual({ minMs: start, maxMs: end })
    const bar = layout.bars[0]
    expect(bar?.leftPct).toBe(0)
    expect(bar?.widthPct).toBe(100)
    expect(bar?.isPoint).toBe(false)
  })

  it("renders a single date (no end) as a zero-width point", () => {
    const a = Date.parse("2026-06-01T00:00:00Z")
    const b = Date.parse("2026-06-11T00:00:00Z")
    const layout = buildTimelineLayout([
      { id: "a", startMs: a, endMs: null },
      { id: "b", startMs: b, endMs: null },
    ])
    const point = layout.bars.find((x) => x.id === "a")
    expect(point?.isPoint).toBe(true)
    expect(point?.widthPct).toBe(0)
    expect(point?.leftPct).toBe(0)
  })

  it("pads a zero-width domain (all rows on one instant) by ±1 day", () => {
    const t = Date.parse("2026-06-01T00:00:00Z")
    const layout = buildTimelineLayout([{ id: "a", startMs: t, endMs: null }])
    expect(layout.domain).toEqual({ minMs: t - DAY_MS, maxMs: t + DAY_MS })
  })

  it("treats an end at/before start as a point", () => {
    const start = Date.parse("2026-06-05T00:00:00Z")
    const earlier = Date.parse("2026-06-01T00:00:00Z")
    const layout = buildTimelineLayout([
      { id: "a", startMs: start, endMs: earlier },
      { id: "b", startMs: Date.parse("2026-06-10T00:00:00Z"), endMs: null },
    ])
    expect(layout.bars.find((x) => x.id === "a")?.isPoint).toBe(true)
  })

  it("emits the requested number of evenly-spaced ticks spanning the domain", () => {
    const start = Date.parse("2026-06-01T00:00:00Z")
    const end = Date.parse("2026-06-11T00:00:00Z")
    const layout = buildTimelineLayout([{ id: "a", startMs: start, endMs: end }], { tickCount: 3 })
    expect(layout.ticks).toHaveLength(3)
    expect(layout.ticks[0]).toEqual({ ms: start, leftPct: 0 })
    expect(layout.ticks[2]).toEqual({ ms: end, leftPct: 100 })
    expect(layout.ticks[1]?.leftPct).toBe(50)
  })

  it("floors a short range bar to the minimum visible width", () => {
    const min = Date.parse("2026-06-01T00:00:00Z")
    const max = min + 100 * DAY_MS
    const layout = buildTimelineLayout(
      [
        { id: "short", startMs: min, endMs: min + DAY_MS },
        { id: "long", startMs: min, endMs: max },
      ],
      { minWidthPct: 2 }
    )
    expect(layout.bars.find((x) => x.id === "short")?.widthPct).toBe(2)
  })
})
