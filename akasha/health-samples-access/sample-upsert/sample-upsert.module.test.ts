import { expect, test } from "bun:test"
import { sampleIdentity } from "../sample-identity/sample-identity.module.code.ts"
import type { HealthSample } from "../sample-shape/sample-shape.module.code.ts"
import { mergedInto } from "./sample-upsert.module.code.ts"

const AT =
  "akasha/alan/eso-daily-tracking/eso-daily-trackings/eso-day-2026-01-01/eso-day-2026-01-01.eso-daily-tracking.health-samples.jsonl"

const ARRIVED = "2026-01-01T12:00:00.000Z"

function sampleOf(value: number): HealthSample {
  return {
    metric: "stepCount",
    startedAt: "2026-01-01T08:00:00.000Z",
    endedAt: "2026-01-01T08:05:00.000Z",
    value,
    unit: "count",
    sourceName: "a fixture",
  }
}

function heldOf(sample: HealthSample): readonly (readonly [string, HealthSample])[] {
  return [[sampleIdentity(sample), sample]]
}

const HELD = heldOf(sampleOf(11))

test("a reading nothing has filed is added, and the file is touched", () => {
  const merged = mergedInto([], HELD, ARRIVED, AT)
  expect(merged.touched).toBe(true)
  expect(merged.tally).toEqual({ inserted: 1, unchanged: 0, valueChanged: 0 })
  expect(merged.lines).toHaveLength(1)
})

test("a row is written with the keys a row beside an akasha page carries", () => {
  const merged = mergedInto([], HELD, ARRIVED, AT)
  const row = JSON.parse(merged.lines[0] as string) as Record<string, unknown>
  expect(Object.keys(row).sort()).toEqual([
    "arrivedAt",
    "endedAt",
    "id",
    "metric",
    "seq",
    "sourceName",
    "startedAt",
    "unit",
    "value",
  ])
  expect(row["startedAt"]).toBe("2026-01-01T08:00:00.000Z")
  expect(row["arrivedAt"]).toBe(ARRIVED)
  expect(row["seq"]).toBe(1)
})

test("a reading already filed at that value touches nothing", () => {
  const first = mergedInto([], HELD, ARRIVED, AT)
  const again = mergedInto(first.lines, HELD, "2026-01-02T12:00:00.000Z", AT)
  expect(again.touched).toBe(false)
  expect(again.tally).toEqual({ inserted: 0, unchanged: 1, valueChanged: 0 })
  expect(again.lines).toEqual(first.lines)
})

test("a reading whose value moved keeps the id and the seq it was filed under", () => {
  const first = mergedInto([], HELD, ARRIVED, AT)
  const was = JSON.parse(first.lines[0] as string) as Record<string, unknown>
  const moved = mergedInto(first.lines, heldOf(sampleOf(12)), ARRIVED, AT)
  expect(moved.touched).toBe(true)
  expect(moved.tally).toEqual({ inserted: 0, unchanged: 0, valueChanged: 1 })
  expect(moved.lines).toHaveLength(1)
  const now = JSON.parse(moved.lines[0] as string) as Record<string, unknown>
  expect(now["id"]).toBe(was["id"])
  expect(now["seq"]).toBe(was["seq"])
  expect(now["value"]).toBe(12)
})

test("a second reading takes the seq after the highest already filed", () => {
  const first = mergedInto([], HELD, ARRIVED, AT)
  const other: HealthSample = { ...sampleOf(20), startedAt: "2026-01-01T09:00:00.000Z" }
  const both = mergedInto(first.lines, heldOf(other), ARRIVED, AT)
  const now = JSON.parse(both.lines[1] as string) as Record<string, unknown>
  expect(now["seq"]).toBe(2)
})

test("a row already filed is matched by what names a reading rather than by its value", () => {
  const first = mergedInto([], HELD, ARRIVED, AT)
  const renamed: HealthSample = { ...sampleOf(11), sourceName: "another fixture" }
  const merged = mergedInto(first.lines, heldOf(renamed), ARRIVED, AT)
  expect(merged.tally).toEqual({ inserted: 1, unchanged: 0, valueChanged: 0 })
  expect(merged.lines).toHaveLength(2)
})
