import { describe, expect, test } from "bun:test"
import { insertLocationTraces } from "./insert"
import { esoDayOfTrace, rowValuesOf, traceIdentity } from "./rows"
import type { LocationTraceInsert } from "./types"

const point: LocationTraceInsert = {
  deviceId: "d1",
  clientSeq: 1,
  capturedAt: "2026-07-16T18:00:00.000Z",
  latitude: 40.25,
  longitude: -111.65,
  accuracyM: 5,
  headingDeg: null,
}

describe("traceIdentity", () => {
  test("a device and a client sequence settle a trace, and nothing else does", () => {
    expect(traceIdentity({ deviceId: "d1", clientSeq: 1 })).toBe(
      traceIdentity({ deviceId: "d1", clientSeq: 1 })
    )
  })

  test("the same sequence from another device is another trace", () => {
    expect(traceIdentity({ deviceId: "d1", clientSeq: 1 })).not.toBe(
      traceIdentity({ deviceId: "d2", clientSeq: 1 })
    )
  })

  test("another sequence from the same device is another trace", () => {
    expect(traceIdentity({ deviceId: "d1", clientSeq: 1 })).not.toBe(
      traceIdentity({ deviceId: "d1", clientSeq: 2 })
    )
  })
})

describe("rowValuesOf", () => {
  test("every key a location-trace row carries is kebab-case", () => {
    const row = rowValuesOf(point, "r1")
    expect(row.id).toBe("r1")
    expect(row["device-id"]).toBe("d1")
    expect(row["client-seq"]).toBe(1)
    expect(row["captured-at"]).toBe("2026-07-16T18:00:00.000Z")
    expect(row.latitude).toBe(40.25)
    expect(row.longitude).toBe(-111.65)
    expect(row["accuracy-m"]).toBe(5)
  })

  test("an optional nobody stated is left off the row rather than standing as null", () => {
    const row = rowValuesOf(point, "r1")
    expect("heading-deg" in row).toBe(false)
    expect("altitude-m" in row).toBe(false)
    expect("source" in row).toBe(false)
  })

  test("every optional the device stated stands on the row", () => {
    const row = rowValuesOf(
      {
        ...point,
        altitudeM: 1400,
        altitudeAccuracyM: 3,
        speedMps: 12.5,
        headingDeg: 270,
        isMoving: true,
        activityType: "automotive",
        batteryLevel: 0.42,
        batteryIsCharging: false,
        odometerM: 98765,
        source: "atlas-ios-debug",
      },
      "r1"
    )
    expect(row["altitude-m"]).toBe(1400)
    expect(row["altitude-accuracy-m"]).toBe(3)
    expect(row["speed-mps"]).toBe(12.5)
    expect(row["heading-deg"]).toBe(270)
    expect(row["is-moving"]).toBe(true)
    expect(row["activity-type"]).toBe("automotive")
    expect(row["battery-level"]).toBe(0.42)
    expect(row["battery-is-charging"]).toBe(false)
    expect(row["odometer-m"]).toBe(98765)
    expect(row.source).toBe("atlas-ios-debug")
  })

  test("a false boolean stands on the row rather than being read as absent", () => {
    const row = rowValuesOf({ ...point, isMoving: false }, "r1")
    expect(row["is-moving"]).toBe(false)
  })

  test("a zero stands on the row rather than being read as absent", () => {
    const row = rowValuesOf({ ...point, odometerM: 0 }, "r1")
    expect(row["odometer-m"]).toBe(0)
  })
})

describe("esoDayOfTrace", () => {
  test("a trace taken before the six o'clock reset hangs off the day before", () => {
    expect(esoDayOfTrace("2026-07-16T09:30:00.000Z")).toBe("2026-07-15")
  })

  test("a trace taken after the six o'clock reset hangs off the day it was taken in", () => {
    expect(esoDayOfTrace("2026-07-16T10:30:00.000Z")).toBe("2026-07-16")
  })
})

describe("insertLocationTraces", () => {
  test("an empty batch inserts nothing and reaches the page query service for nothing", async () => {
    expect(await insertLocationTraces([])).toEqual({ inserted: 0 })
  })
})
