import { resolveLocationIngestContext } from "akasha/alan/atlas-web/.server/location-ingest-context/location-ingest-context.module.code.ts"
import {
  locationBatchSchema,
  sortPoints,
} from "akasha/alan/atlas-web/modules/location-batch/location-batch.module.code.ts"
import { insertLocationTraces } from "akasha/alan/harness/location-trace-access/modules/trace-insert/trace-insert.module.code.ts"
import type { LocationTraceInsert } from "akasha/alan/harness/location-trace-access/modules/trace-shape/trace-shape.module.code.ts"

export async function action({ request }: { request: Request }): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "method-not-allowed" }, { status: 405 })
  }

  const ctx = await resolveLocationIngestContext(request)
  if (!ctx.authenticated) {
    return Response.json({ error: "Not authenticated" }, { status: 401, headers: ctx.headers })
  }

  let rawBody: unknown
  try {
    rawBody = await request.json()
  } catch {
    return Response.json({ error: "invalid-json" }, { status: 400, headers: ctx.headers })
  }
  const parsed = locationBatchSchema.safeParse(rawBody)
  if (!parsed.success) {
    return Response.json({ error: "invalid-payload" }, { status: 400, headers: ctx.headers })
  }

  const sorted = sortPoints(parsed.data.points)
  for (const one of sorted.refused) {
    console.warn(
      `[atlas/web/api.locations.ingest] refused point ${String(one.index)}: ${one.why} — ${JSON.stringify(parsed.data.points[one.index])}`
    )
  }

  const records: LocationTraceInsert[] = sorted.points.map((p) => ({
    deviceId: p.deviceId,
    clientSeq: p.clientSeq,
    capturedAt: p.capturedAt,
    latitude: p.latitude,
    longitude: p.longitude,
    accuracyM: p.accuracyM,
    altitudeM: p.altitudeM,
    altitudeAccuracyM: p.altitudeAccuracyM,
    speedMps: p.speedMps,
    headingDeg: p.headingDeg,
    isMoving: p.isMoving,
    activityType: p.activityType,
    batteryLevel: p.batteryLevel,
    batteryIsCharging: p.batteryIsCharging,
    odometerM: p.odometerM,
  }))

  try {
    const { inserted } = await insertLocationTraces(records)
    const received = parsed.data.points.length
    const answer =
      sorted.refused.length === 0
        ? { received, inserted }
        : { received, inserted, refused: sorted.refused }
    return Response.json(answer, { headers: ctx.headers })
  } catch (err) {
    console.error("[atlas/web/api.locations.ingest] insertLocationTraces failed:", err)
    return Response.json({ error: "ingest-failed" }, { status: 500, headers: ctx.headers })
  }
}
