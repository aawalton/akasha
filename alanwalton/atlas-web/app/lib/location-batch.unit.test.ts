import { describe, expect, test } from "bun:test"
import { ingestResponseSchema, locationBatchSchema, MAX_BATCH_POINTS } from "./location-batch"

function validPoint(overrides: Record<string, unknown> = {}) {
  return {
    deviceId: "device-abc",
    clientSeq: 0,
    capturedAt: "2026-07-16T00:00:00.000Z",
    latitude: 40.25,
    longitude: -111.65,
    ...overrides,
  }
}

describe("locationBatchSchema", () => {
  test("accepts a minimal valid batch", () => {
    const parsed = locationBatchSchema.safeParse({ points: [validPoint()] })
    expect(parsed.success).toBe(true)
  })

  test("accepts full optional sensor fields, including sentinel-ish values", () => {
    const parsed = locationBatchSchema.safeParse({
      points: [
        validPoint({
          accuracyM: -1,
          altitudeM: 1400,
          altitudeAccuracyM: 3,
          speedMps: 1.4,
          headingDeg: -1,
          isMoving: true,
          activityType: "walking",
          batteryLevel: 0.42,
          batteryIsCharging: false,
          odometerM: 1234.5,
        }),
      ],
    })
    expect(parsed.success).toBe(true)
  })

  test("rejects an unknown key (strict)", () => {
    const parsed = locationBatchSchema.safeParse({ points: [validPoint({ hax: 1 })] })
    expect(parsed.success).toBe(false)
  })

  test("rejects a top-level unknown key (strict)", () => {
    const parsed = locationBatchSchema.safeParse({ points: [validPoint()], extra: true })
    expect(parsed.success).toBe(false)
  })

  test("rejects latitude out of WGS84 range", () => {
    expect(locationBatchSchema.safeParse({ points: [validPoint({ latitude: 91 })] }).success).toBe(
      false
    )
    expect(
      locationBatchSchema.safeParse({ points: [validPoint({ longitude: -181 })] }).success
    ).toBe(false)
  })

  test("rejects a non-integer / negative clientSeq", () => {
    expect(
      locationBatchSchema.safeParse({ points: [validPoint({ clientSeq: 1.5 })] }).success
    ).toBe(false)
    expect(locationBatchSchema.safeParse({ points: [validPoint({ clientSeq: -1 })] }).success).toBe(
      false
    )
  })

  test("rejects a non-ISO capturedAt", () => {
    expect(
      locationBatchSchema.safeParse({ points: [validPoint({ capturedAt: "yesterday" })] }).success
    ).toBe(false)
  })

  test("rejects an empty deviceId", () => {
    expect(locationBatchSchema.safeParse({ points: [validPoint({ deviceId: "" })] }).success).toBe(
      false
    )
  })

  test("rejects an empty batch", () => {
    expect(locationBatchSchema.safeParse({ points: [] }).success).toBe(false)
  })

  test("rejects a batch over the cap", () => {
    const points = Array.from({ length: MAX_BATCH_POINTS + 1 }, (_, i) =>
      validPoint({ clientSeq: i })
    )
    expect(locationBatchSchema.safeParse({ points }).success).toBe(false)
  })
})

describe("ingestResponseSchema", () => {
  test("accepts a well-formed response", () => {
    expect(ingestResponseSchema.safeParse({ received: 3, inserted: 2 }).success).toBe(true)
  })
  test("rejects a missing field", () => {
    expect(ingestResponseSchema.safeParse({ received: 3 }).success).toBe(false)
  })
})
