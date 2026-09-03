import { insertLocationTraces } from "@akasha/location-traces-access/trace-insert"
import type { LocationTraceInsert } from "@akasha/location-traces-access/trace-shape"
import { resolveLocationIngestContext } from "../.server/location-ingest-context/location-ingest-context.module.code.ts"
import { locationBatchSchema } from "../location-batch/location-batch.module.code.ts"
import type { Route } from "./+types/api.locations.ingest"

export async function action({ request }: Route.ActionArgs): Promise<Response> {
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

  const records: LocationTraceInsert[] = parsed.data.points.map((p) => ({
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
    return Response.json({ received: records.length, inserted }, { headers: ctx.headers })
  } catch (err) {
    console.error("[atlas/web/api.locations.ingest] insertLocationTraces failed:", err)
    return Response.json({ error: "ingest-failed" }, { status: 500, headers: ctx.headers })
  }
}
