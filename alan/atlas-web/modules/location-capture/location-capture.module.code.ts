import {
  type LocationPoint,
  MAX_BATCH_POINTS,
  sortPoints,
} from "akasha/alan/atlas-web/modules/location-batch/location-batch.module.code.ts"
import { z } from "zod"

export interface PluginLocation {
  latitude: number
  longitude: number
  accuracy: number | null
  altitude: number | null
  altitudeAccuracy: number | null
  speed: number | null
  bearing: number | null
  time: number | null
}

function finiteNonNegative(n: number | null | undefined): number | undefined {
  if (n == null || !Number.isFinite(n) || n < 0) return undefined
  return n
}

function finiteSigned(n: number | null | undefined): number | undefined {
  if (n == null || !Number.isFinite(n)) return undefined
  return n
}

function capturedAtIso(timeMs: number | null | undefined, nowMs: number): string {
  const ms = timeMs != null && Number.isFinite(timeMs) ? timeMs : nowMs
  return new Date(ms).toISOString()
}

export function nextSeq(current: number): number {
  return current + 1
}

export function mapPluginLocation(
  loc: PluginLocation,
  ctx: { deviceId: string; clientSeq: number; nowMs: number }
): LocationPoint | null {
  const latitude = finiteSigned(loc.latitude)
  const longitude = finiteSigned(loc.longitude)
  if (
    latitude === undefined ||
    longitude === undefined ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return null
  }

  const point: LocationPoint = {
    deviceId: ctx.deviceId,
    clientSeq: ctx.clientSeq,
    capturedAt: capturedAtIso(loc.time, ctx.nowMs),
    latitude,
    longitude,
  }
  const accuracyM = finiteNonNegative(loc.accuracy)
  if (accuracyM !== undefined) point.accuracyM = accuracyM
  const altitudeM = finiteSigned(loc.altitude)
  if (altitudeM !== undefined) point.altitudeM = altitudeM
  const altitudeAccuracyM = finiteNonNegative(loc.altitudeAccuracy)
  if (altitudeAccuracyM !== undefined) point.altitudeAccuracyM = altitudeAccuracyM
  const speedMps = finiteNonNegative(loc.speed)
  if (speedMps !== undefined) point.speedMps = speedMps
  const headingDeg = finiteNonNegative(loc.bearing)
  if (headingDeg !== undefined) point.headingDeg = headingDeg
  return point
}

function pointKey(p: Pick<LocationPoint, "deviceId" | "clientSeq">): string {
  return `${p.deviceId}:${p.clientSeq}`
}

export function addPoint(
  buffer: readonly LocationPoint[],
  point: LocationPoint
): readonly LocationPoint[] {
  const key = pointKey(point)
  if (buffer.some((p) => pointKey(p) === key)) return buffer
  return [...buffer, point]
}

export function removePoints(
  buffer: readonly LocationPoint[],
  acked: readonly LocationPoint[]
): readonly LocationPoint[] {
  if (acked.length === 0) return buffer
  const ackedKeys = new Set(acked.map(pointKey))
  return buffer.filter((p) => !ackedKeys.has(pointKey(p)))
}

export interface StoredBuffer {
  readonly points: readonly LocationPoint[]
  readonly refused: number
  readonly why: string | null
  readonly unreadable: boolean
}

const storedListSchema = z.array(z.unknown())

export function readStoredBuffer(stored: string): StoredBuffer {
  let held: unknown
  try {
    held = JSON.parse(stored)
  } catch (err) {
    return { points: [], refused: 0, why: `not JSON: ${String(err)}`, unreadable: true }
  }
  const list = storedListSchema.safeParse(held)
  if (!list.success) {
    return { points: [], refused: 0, why: "not a list of points", unreadable: true }
  }
  const sorted = sortPoints(list.data)
  const first = sorted.refused[0]
  return {
    points: sorted.points,
    refused: sorted.refused.length,
    why: first === undefined ? null : `point ${String(first.index)}: ${first.why}`,
    unreadable: false,
  }
}

export function nextBatch(
  buffer: readonly LocationPoint[],
  max: number = MAX_BATCH_POINTS
): readonly LocationPoint[] {
  return buffer.slice(0, Math.max(0, max))
}
