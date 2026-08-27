import { describe, expect, test } from "bun:test"
import { formatWatermark, observeRss, RSS_REPORT_STEP_BYTES } from "./memory-watch"

const MIB = 1024 * 1024

describe("observeRss", () => {
  test("the watermark never falls, whatever the samples do", () => {
    const samples = [10, 400, 30, 900, 120, 512, 5, 2048].map((m) => m * MIB)
    let watermark = 0
    let previous = 0
    for (const sample of samples) {
      const decision = observeRss(sample, watermark)
      expect(decision.watermark).toBeGreaterThanOrEqual(previous)
      previous = decision.watermark
      watermark = decision.watermark
    }
    expect(watermark).toBe(2048 * MIB)
  })

  test("reports if and only if the sample clears the last high by a full step", () => {
    const base = 100 * MIB
    const first = observeRss(base, 0)
    expect(first.report).toBe(true)
    expect(first.watermark).toBe(base)

    const quiet = observeRss(base + RSS_REPORT_STEP_BYTES - 1, first.watermark)
    expect(quiet.report).toBe(false)
    expect(quiet.watermark).toBe(base)

    const loud = observeRss(base + RSS_REPORT_STEP_BYTES, quiet.watermark)
    expect(loud.report).toBe(true)
    expect(loud.watermark).toBe(base + RSS_REPORT_STEP_BYTES)
  })

  test("a fall is silent and leaves the high standing", () => {
    const high = observeRss(200 * MIB, 0)
    const dropped = observeRss(20 * MIB, high.watermark)
    expect(dropped.report).toBe(false)
    expect(dropped.watermark).toBe(200 * MIB)
  })

  test("a steady process emits nothing after its first sample", () => {
    let watermark = 0
    let lines = 0
    for (let i = 0; i < 500; i += 1) {
      const decision = observeRss(130 * MIB, watermark)
      watermark = decision.watermark
      if (decision.report) lines += 1
    }
    expect(lines).toBe(1)
  })

  test("the line states a reading and passes no judgement on it", () => {
    const line = formatWatermark(214.6 * MIB)
    expect(line).toContain("214.6MiB")
    expect(line.toLowerCase()).not.toContain("warn")
    expect(line.split("\n")).toHaveLength(1)
  })
})
