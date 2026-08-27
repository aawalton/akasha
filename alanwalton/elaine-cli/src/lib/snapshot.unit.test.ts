import { describe, expect, test } from "bun:test"
import { PROTOCOL_STDOUT } from "./fixtures/sample-stdout"
import { parseHealthExport } from "./health-export"
import { formatSnapshot, type MetricSummary, summarizeSnapshot } from "./snapshot"

const NOW = Date.parse("2024-01-15T12:00:00Z")
const EXPORT = parseHealthExport(PROTOCOL_STDOUT)

function byMetric(summaries: readonly MetricSummary[], metric: string): MetricSummary {
  const found = summaries.find((m) => m.metric === metric)
  if (found === undefined) throw new Error(`no summary for ${metric}`)
  return found
}

describe("summarizeSnapshot", () => {
  test("HRV is the marquee metric (first in the list)", () => {
    const snapshot = summarizeSnapshot(EXPORT, 14, NOW)
    expect(snapshot.metrics[0]?.metric).toBe("hrv")
  })

  test("HRV latest + trend over the window", () => {
    const hrv = byMetric(summarizeSnapshot(EXPORT, 14, NOW).metrics, "hrv")
    expect(hrv.latest).toBe(50)
    expect(hrv.latestDay).toBe("2024-01-14")
    expect(hrv.mean).toBe(45)
    expect(hrv.min).toBe(40)
    expect(hrv.max).toBe(50)
    expect(hrv.n).toBe(2)
  })

  test("resting heart rate latest is the most recent sample", () => {
    const rhr = byMetric(summarizeSnapshot(EXPORT, 14, NOW).metrics, "restingHeartRate")
    expect(rhr.latest).toBe(58)
    expect(rhr.mean).toBe(59)
  })

  test("SpO2 fraction is scaled to a percentage", () => {
    const spo2 = byMetric(summarizeSnapshot(EXPORT, 14, NOW).metrics, "oxygenSaturation")
    expect(spo2.latest).toBeCloseTo(97, 5)
    expect(spo2.mean).toBeCloseTo(96, 5)
    expect(spo2.unit).toBe("%")
  })

  test("steps are summed into daily totals", () => {
    const steps = byMetric(summarizeSnapshot(EXPORT, 14, NOW).metrics, "stepCount")
    expect(steps.latest).toBe(1000)
    expect(steps.min).toBe(300)
    expect(steps.max).toBe(1000)
    expect(steps.n).toBe(2)
    expect(steps.nLabel).toBe("days")
  })

  test("sleep sums asleep-stage hours per night, excluding InBed and Awake", () => {
    const sleep = byMetric(summarizeSnapshot(EXPORT, 14, NOW).metrics, "sleep")
    expect(sleep.latest).toBeCloseTo(3.5, 5)
    expect(sleep.min).toBeCloseTo(2, 5)
    expect(sleep.max).toBeCloseTo(3.5, 5)
    expect(sleep.n).toBe(2)
    expect(sleep.nLabel).toBe("nights")
  })

  test("a narrow window drops older samples", () => {
    const hrv = byMetric(summarizeSnapshot(EXPORT, 1, NOW).metrics, "hrv")
    expect(hrv.n).toBe(1)
    expect(hrv.latest).toBe(50)
  })
})

describe("formatSnapshot", () => {
  test("renders a human snapshot with HRV first and SpO2 as a percentage", () => {
    const out = formatSnapshot(summarizeSnapshot(EXPORT, 14, NOW))
    expect(out).toContain("Apple Health snapshot")
    expect(out).toContain("HRV (SDNN)")
    expect(out).toContain("latest 50 ms")
    expect(out).toContain("latest 97 %")
    expect(out.indexOf("HRV (SDNN)")).toBeLessThan(out.indexOf("Resting heart rate"))
  })
})
