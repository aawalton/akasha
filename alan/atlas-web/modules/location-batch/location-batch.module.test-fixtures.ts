import type { LocationPoint } from "akasha/alan/atlas-web/modules/location-batch/location-batch.module.code.ts"

export function pointOf(clientSeq: number): LocationPoint {
  return {
    deviceId: "a fixture phone",
    clientSeq,
    capturedAt: "2026-01-15T11:00:00.000Z",
    latitude: 40.7608,
    longitude: -111.891,
  }
}
