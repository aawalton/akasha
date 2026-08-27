import { describe, expect, test } from "bun:test"
import { PROTOCOL_STDOUT } from "./fixtures/sample-stdout"
import { parseHealthExport } from "./health-export"

describe("parseHealthExport", () => {
  test("NOFILE yields a null source and no records", () => {
    const result = parseHealthExport("NOFILE\n")
    expect(result.sourceFile).toBeNull()
    expect(result.records).toHaveLength(0)
  })

  test("empty stdout is tolerated", () => {
    const result = parseHealthExport("")
    expect(result.sourceFile).toBeNull()
    expect(result.records).toHaveLength(0)
  })

  test("parses the source path, export date, and all metric records", () => {
    const result = parseHealthExport(PROTOCOL_STDOUT)
    expect(result.sourceFile).toBe("/Users/walton/Downloads/export.zip")
    expect(result.exportedAtMs).toBe(Date.parse("2024-01-15T08:30:00-08:00"))
    expect(result.records).toHaveLength(16)
  })

  test("skips records with a malformed date rather than throwing", () => {
    const result = parseHealthExport(PROTOCOL_STDOUT)
    expect(result.skipped).toBe(1)
  })

  test("keeps the SpO2 value as the raw 0-1 fraction (scaling happens in the summary)", () => {
    const result = parseHealthExport(PROTOCOL_STDOUT)
    const spo2 = result.records.filter((r) => r.metric === "oxygenSaturation")
    expect(spo2.map((r) => r.value).sort()).toEqual(["0.95", "0.97"])
  })

  test("derives device-local civil days from the Apple date strings", () => {
    const result = parseHealthExport(PROTOCOL_STDOUT)
    const hrv = result.records.filter((r) => r.metric === "hrv")
    expect(hrv.map((r) => r.startDay).sort()).toEqual(["2024-01-13", "2024-01-14"])
  })

  test("is independent of attribute order", () => {
    const line =
      '<Record value="42" endDate="2024-01-14 07:01:00 -0800" type="HKQuantityTypeIdentifierHeartRateVariabilitySDNN" startDate="2024-01-14 07:00:00 -0800" unit="ms"/>'
    const result = parseHealthExport(`FILE\t/x.zip\n${line}`)
    expect(result.records).toHaveLength(1)
    expect(result.records[0]?.metric).toBe("hrv")
    expect(result.records[0]?.value).toBe("42")
  })
})
