import type { LocationTraceInsert } from "../trace-shape/trace-shape.module.code.ts"

export const ANCHOR_PAGE_TYPE = "eso-day"

export const ROW_PAGE_TYPE = "location-trace"

export const ROW_CEILING = 50000

export interface TraceIdentityParts {
  readonly deviceId: string
  readonly clientSeq: number
}

export function traceIdentity(parts: TraceIdentityParts): string {
  return JSON.stringify([parts.deviceId, parts.clientSeq])
}

function stated(
  key: string,
  held: string | number | boolean | null | undefined
): Readonly<Record<string, string | number | boolean>> {
  return held === null || held === undefined ? {} : { [key]: held }
}

export function rowValuesOf(
  trace: LocationTraceInsert,
  id: string
): Readonly<Record<string, unknown>> {
  return {
    id,
    "device-id": trace.deviceId,
    "client-seq": trace.clientSeq,
    "captured-at": trace.capturedAt,
    latitude: trace.latitude,
    longitude: trace.longitude,
    ...stated("accuracy-m", trace.accuracyM),
    ...stated("altitude-m", trace.altitudeM),
    ...stated("altitude-accuracy-m", trace.altitudeAccuracyM),
    ...stated("speed-mps", trace.speedMps),
    ...stated("heading-deg", trace.headingDeg),
    ...stated("is-moving", trace.isMoving),
    ...stated("activity-type", trace.activityType),
    ...stated("battery-level", trace.batteryLevel),
    ...stated("battery-is-charging", trace.batteryIsCharging),
    ...stated("odometer-m", trace.odometerM),
    ...stated("source", trace.source),
  }
}
