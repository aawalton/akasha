import { describe, expect, test } from "bun:test"
import type { LocationPoint } from "./location-batch"
import { MAX_BATCH_POINTS } from "./location-batch"
import {
  addPoint,
  capturedAtIso,
  finiteNonNegative,
  finiteSigned,
  mapPluginLocation,
  nextBatch,
  nextSeq,
  type PluginLocation,
  pointKey,
  removePoints,
} from "./location-capture"

const CTX = { deviceId: "dev-1", clientSeq: 0, nowMs: Date.parse("2026-07-16T12:00:00.000Z") }

function fix(overrides: Partial<PluginLocation> = {}): PluginLocation {
  return {
    latitude: 40.25,
    longitude: -111.65,
    accuracy: 5,
    altitude: 1400,
    altitudeAccuracy: 3,
    speed: 1.4,
    bearing: 90,
    time: Date.parse("2026-07-16T12:00:00.000Z"),
    ...overrides,
  }
}

function point(overrides: Partial<LocationPoint> = {}): LocationPoint {
  return {
    deviceId: "dev-1",
    clientSeq: 0,
    capturedAt: "2026-07-16T12:00:00.000Z",
    latitude: 40.25,
    longitude: -111.65,
    ...overrides,
  }
}

describe("nextSeq", () => {
  test("is strictly monotonic and starts from 0", () => {
    let seq = 0
    const seen: number[] = []
    for (let i = 0; i < 5; i++) {
      seen.push(seq)
      seq = nextSeq(seq)
    }
    expect(seen).toEqual([0, 1, 2, 3, 4])
    expect(seq).toBe(5)
  })
})

describe("finiteNonNegative / finiteSigned", () => {
  test("finiteNonNegative drops null, NaN, Infinity, and negatives (iOS sentinels)", () => {
    expect(finiteNonNegative(5)).toBe(5)
    expect(finiteNonNegative(0)).toBe(0)
    expect(finiteNonNegative(-1)).toBeUndefined()
    expect(finiteNonNegative(null)).toBeUndefined()
    expect(finiteNonNegative(Number.NaN)).toBeUndefined()
    expect(finiteNonNegative(Number.POSITIVE_INFINITY)).toBeUndefined()
  })

  test("finiteSigned keeps negatives (e.g. below-sea-level altitude) but drops null/NaN", () => {
    expect(finiteSigned(-430)).toBe(-430)
    expect(finiteSigned(0)).toBe(0)
    expect(finiteSigned(null)).toBeUndefined()
    expect(finiteSigned(Number.NaN)).toBeUndefined()
  })
})

describe("capturedAtIso", () => {
  test("uses the fix time when present", () => {
    expect(capturedAtIso(Date.parse("2026-01-02T03:04:05.000Z"), CTX.nowMs)).toBe(
      "2026-01-02T03:04:05.000Z"
    )
  })
  test("falls back to now when the fix has no time", () => {
    expect(capturedAtIso(null, CTX.nowMs)).toBe("2026-07-16T12:00:00.000Z")
  })
})

describe("mapPluginLocation", () => {
  test("maps a full fix to the wire shape with renamed fields", () => {
    const mapped = mapPluginLocation(fix(), CTX)
    expect(mapped).toEqual({
      deviceId: "dev-1",
      clientSeq: 0,
      capturedAt: "2026-07-16T12:00:00.000Z",
      latitude: 40.25,
      longitude: -111.65,
      accuracyM: 5,
      altitudeM: 1400,
      altitudeAccuracyM: 3,
      speedMps: 1.4,
      headingDeg: 90,
    })
  })

  test("drops heading/speed/accuracy sentinels (-1) rather than storing them", () => {
    const mapped = mapPluginLocation(fix({ bearing: -1, speed: -1, accuracy: -1 }), CTX)
    expect(mapped).not.toBeNull()
    expect(mapped?.headingDeg).toBeUndefined()
    expect(mapped?.speedMps).toBeUndefined()
    expect(mapped?.accuracyM).toBeUndefined()
    expect(mapped?.latitude).toBe(40.25)
  })

  test("drops null optional channels", () => {
    const mapped = mapPluginLocation(
      fix({ altitude: null, altitudeAccuracy: null, speed: null, bearing: null }),
      CTX
    )
    expect(mapped?.altitudeM).toBeUndefined()
    expect(mapped?.altitudeAccuracyM).toBeUndefined()
    expect(mapped?.speedMps).toBeUndefined()
    expect(mapped?.headingDeg).toBeUndefined()
  })

  test("keeps a legitimately-negative altitude", () => {
    expect(mapPluginLocation(fix({ altitude: -50 }), CTX)?.altitudeM).toBe(-50)
  })

  test("returns null for a missing / out-of-range coordinate", () => {
    expect(mapPluginLocation(fix({ latitude: Number.NaN }), CTX)).toBeNull()
    expect(mapPluginLocation(fix({ latitude: 91 }), CTX)).toBeNull()
    expect(mapPluginLocation(fix({ longitude: -181 }), CTX)).toBeNull()
  })

  test("stamps the supplied clientSeq", () => {
    expect(mapPluginLocation(fix(), { ...CTX, clientSeq: 42 })?.clientSeq).toBe(42)
  })
})

describe("buffer add / dedup / remove", () => {
  test("addPoint appends", () => {
    const buffer = addPoint([], point({ clientSeq: 0 }))
    expect(buffer).toHaveLength(1)
    const buffer2 = addPoint(buffer, point({ clientSeq: 1 }))
    expect(buffer2.map((p) => p.clientSeq)).toEqual([0, 1])
  })

  test("addPoint dedups on (deviceId, clientSeq) identity", () => {
    const buffer = addPoint([point({ clientSeq: 0 })], point({ clientSeq: 0 }))
    expect(buffer).toHaveLength(1)
  })

  test("addPoint treats same seq on a different device as distinct", () => {
    const buffer = addPoint(
      [point({ deviceId: "a", clientSeq: 0 })],
      point({ deviceId: "b", clientSeq: 0 })
    )
    expect(buffer).toHaveLength(2)
  })

  test("removePoints removes only acked identities, keeping the rest", () => {
    const buffer = [point({ clientSeq: 0 }), point({ clientSeq: 1 }), point({ clientSeq: 2 })]
    const remaining = removePoints(buffer, [point({ clientSeq: 0 }), point({ clientSeq: 1 })])
    expect(remaining.map((p) => p.clientSeq)).toEqual([2])
  })

  test("removePoints of an empty ack is a no-op", () => {
    const buffer = [point({ clientSeq: 0 })]
    expect(removePoints(buffer, [])).toBe(buffer)
  })

  test("pointKey is (deviceId, clientSeq)", () => {
    expect(pointKey({ deviceId: "d", clientSeq: 7 })).toBe("d:7")
  })
})

describe("nextBatch", () => {
  test("returns the whole buffer when under the cap, oldest first", () => {
    const buffer = [point({ clientSeq: 0 }), point({ clientSeq: 1 })]
    expect(nextBatch(buffer).map((p) => p.clientSeq)).toEqual([0, 1])
  })

  test("slices at MAX_BATCH_POINTS", () => {
    const buffer = Array.from({ length: MAX_BATCH_POINTS + 5 }, (_, i) => point({ clientSeq: i }))
    const batch = nextBatch(buffer)
    expect(batch).toHaveLength(MAX_BATCH_POINTS)
    expect(batch[0]?.clientSeq).toBe(0)
    expect(batch[batch.length - 1]?.clientSeq).toBe(MAX_BATCH_POINTS - 1)
  })

  test("respects a smaller explicit max", () => {
    const buffer = [point({ clientSeq: 0 }), point({ clientSeq: 1 }), point({ clientSeq: 2 })]
    expect(nextBatch(buffer, 2)).toHaveLength(2)
  })
})
