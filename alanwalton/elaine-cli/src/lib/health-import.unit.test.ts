import { describe, expect, test } from "bun:test"
import { IMPORT_RECORD_LINES } from "./fixtures/import-stdout"
import { buildAwkProgram, buildFetchScript, parseRecordLine } from "./health-export"
import {
  countConversion,
  emptyTally,
  IMPORT_METRICS,
  toHealthSample,
  UNATTRIBUTED_SOURCE,
} from "./health-import"
import { SNAPSHOT_METRICS } from "./snapshot"

const ACTIVE_ENERGY_ID = "HKQuantityTypeIdentifierActiveEnergyBurned"

function convert(line: string) {
  const record = parseRecordLine(line)
  if (record === undefined) return undefined
  return toHealthSample(record)
}

describe("the Mac-side wire filter is a per-caller question", () => {
  test("the snapshot never asks the macbook for active energy", () => {
    const awk = buildAwkProgram("2024-01-01", SNAPSHOT_METRICS)
    expect(awk).not.toContain(ACTIVE_ENERGY_ID)
    expect(awk).toContain("HKQuantityTypeIdentifierHeartRateVariabilitySDNN")
    expect(awk).toContain("HKCategoryTypeIdentifierSleepAnalysis")
  })

  test("the snapshot's awk program is byte-for-byte what it was before active energy existed", () => {
    expect(buildAwkProgram("2024-01-01", SNAPSHOT_METRICS)).toBe(
      [
        "/<ExportDate /{print;next}",
        '/type="HKQuantityTypeIdentifierHeartRateVariabilitySDNN"/||/type="HKQuantityTypeIdentifierRestingHeartRate"/||/type="HKQuantityTypeIdentifierOxygenSaturation"/||/type="HKQuantityTypeIdentifierStepCount"/||/type="HKCategoryTypeIdentifierSleepAnalysis"/{p=index($0,"startDate=\\"");if(p>0){d=substr($0,p+11,10);if(d>="2024-01-01")print}}',
      ].join("\n")
    )
  })

  test("the script carries the program its metrics build", () => {
    for (const metrics of [SNAPSHOT_METRICS, IMPORT_METRICS]) {
      const script = buildFetchScript({ path: undefined, sinceDay: "2024-01-01", metrics })
      const encoded = Buffer.from(buildAwkProgram("2024-01-01", metrics), "utf8").toString("base64")
      expect(script).toContain(encoded)
    }
  })

  test("the import asks for active energy and steps and nothing else", () => {
    const awk = buildAwkProgram("0001-01-01", IMPORT_METRICS)
    expect(awk).toContain(ACTIVE_ENERGY_ID)
    expect(awk).toContain("HKQuantityTypeIdentifierStepCount")
    expect(awk).not.toContain("HKQuantityTypeIdentifierHeartRateVariabilitySDNN")
    expect(awk).not.toContain("HKCategoryTypeIdentifierSleepAnalysis")
  })

  test("the fetch script only ever reads the macbook", () => {
    const script = buildFetchScript({
      path: undefined,
      sinceDay: "0001-01-01",
      metrics: IMPORT_METRICS,
    })
    for (const mutation of [" rm ", " mv ", " cp ", " >> ", "mkdir", "touch", "unzip -o", "tee "]) {
      expect(script).not.toContain(mutation)
    }
    expect(script).toContain("unzip -p")
  })
})

describe("toHealthSample", () => {
  test("an export's `Cal` is stored under the store's canonical `kcal`", () => {
    const converted = convert(IMPORT_RECORD_LINES[0] ?? "")
    if (!converted?.ok) throw new Error("expected a conversion")
    expect(converted.sample.unit).toBe("kcal")
    expect(converted.sample.metric).toBe("activeEnergy")
    expect(converted.sample.value).toBe(4.21)
    expect(converted.sample.sourceName).toBe("Alan’s Apple Watch")
  })

  test("Apple's offset spelling resolves to the same instant, written as UTC", () => {
    const converted = convert(IMPORT_RECORD_LINES[0] ?? "")
    if (!converted?.ok) throw new Error("expected a conversion")
    expect(Date.parse(converted.sample.startedAt)).toBe(Date.parse("2024-01-13T09:00:00-08:00"))
    expect(Date.parse(converted.sample.endedAt)).toBe(Date.parse("2024-01-13T09:05:00-08:00"))
  })

  test("a record carrying child elements converts — every field it needs is on the opening line", () => {
    const line = IMPORT_RECORD_LINES.find((l) => l.endsWith('value="6.5">'))
    const converted = convert(line ?? "")
    if (!converted?.ok) throw new Error("expected a conversion")
    expect(converted.sample.value).toBe(6.5)
    expect(converted.sample.sourceName).toBe("Alan’s Apple Watch")
  })

  test("a record with no sourceName is kept under the placeholder rather than dropped", () => {
    const line = IMPORT_RECORD_LINES.find((l) => !l.includes("sourceName") && l.includes("2.75"))
    const converted = convert(line ?? "")
    if (!converted?.ok) throw new Error("expected a conversion")
    expect(converted.sample.sourceName).toBe(UNATTRIBUTED_SOURCE)
    expect(converted.sourceDefaulted).toBe(true)
  })

  test("the placeholder is constant, so re-reading the same record yields the same identity", () => {
    const line = IMPORT_RECORD_LINES.find((l) => !l.includes("sourceName") && l.includes("2.75"))
    const first = convert(line ?? "")
    const second = convert(line ?? "")
    if (!first?.ok || !second?.ok) throw new Error("expected conversions")
    expect(first.sample).toEqual(second.sample)
  })

  test("an unrecognised unit is refused rather than coerced", () => {
    const line = IMPORT_RECORD_LINES.find((l) => l.includes('unit="kJ"'))
    expect(convert(line ?? "")).toEqual({ ok: false, reason: "unit-unrecognised" })
  })

  test("an inverted span is refused", () => {
    const line = IMPORT_RECORD_LINES.find((l) => l.includes("10:05:00"))
    expect(convert(line ?? "")).toEqual({ ok: false, reason: "span-inverted" })
  })

  test("a non-numeric value is refused", () => {
    const line = IMPORT_RECORD_LINES.find((l) => l.includes('value="lots"'))
    expect(convert(line ?? "")).toEqual({ ok: false, reason: "value-not-a-number" })
  })

  test("XML entities in sourceName are resolved, so both senders spell one device the same way", () => {
    const line =
      '<Record type="HKQuantityTypeIdentifierActiveEnergyBurned" sourceName="Alan&#39;s Watch &amp; Phone" unit="Cal" startDate="2020-03-01 09:00:00 +0000" endDate="2020-03-01 09:05:00 +0000" value="4.21"/>'
    const converted = convert(line)
    if (!converted?.ok) throw new Error("expected a conversion")
    expect(converted.sample.sourceName).toBe("Alan's Watch & Phone")
  })

  test("an escaped ampersand is not re-read as the start of another entity", () => {
    const line =
      '<Record type="HKQuantityTypeIdentifierStepCount" sourceName="A&amp;amp;B" unit="count" startDate="2020-03-01 09:00:00 +0000" endDate="2020-03-01 09:05:00 +0000" value="5"/>'
    const converted = convert(line)
    if (!converted?.ok) throw new Error("expected a conversion")
    expect(converted.sample.sourceName).toBe("A&amp;B")
  })

  test("a metric outside the store's two is refused", () => {
    const hrv =
      '<Record type="HKQuantityTypeIdentifierHeartRateVariabilitySDNN" sourceName="W" unit="ms" startDate="2024-01-13 07:00:00 -0800" endDate="2024-01-13 07:01:00 -0800" value="40"/>'
    expect(convert(hrv)).toEqual({ ok: false, reason: "metric-not-imported" })
  })

  test("nothing is aggregated: two sources over one window stay two samples", () => {
    const both = IMPORT_RECORD_LINES.filter(
      (l) => l.includes("StepCount") && l.includes("2024-01-13 09:00:00")
    )
    expect(both).toHaveLength(2)
    const converted = both.map((l) => convert(l))
    expect(converted.every((c) => c?.ok === true)).toBe(true)
    const names = converted.map((c) => (c?.ok === true ? c.sample.sourceName : undefined))
    expect(new Set(names).size).toBe(2)
  })
})

describe("the tally accounts for every record line", () => {
  test("each line lands in exactly one bucket", () => {
    const tally = emptyTally()
    for (const line of IMPORT_RECORD_LINES) {
      tally.recordLines += 1
      const record = parseRecordLine(line)
      if (record === undefined) {
        tally.unparseable += 1
        continue
      }
      countConversion(tally, toHealthSample(record))
    }
    const refused = Object.values(tally.rejected).reduce((a, b) => a + b, 0)
    expect(tally.recordLines).toBe(IMPORT_RECORD_LINES.length)
    expect(tally.unparseable + tally.converted + refused).toBe(tally.recordLines)
    expect(tally.sourceDefaulted).toBe(1)
  })
})
