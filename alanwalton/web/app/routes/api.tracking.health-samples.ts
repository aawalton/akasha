import { type HealthSample } from "../../../health-samples-access/src/types"
import { upsertHealthSamples } from "../../../health-samples-access/src/upsert"
import { resolveDeviceSecretContext } from "~/device-secret/lib/device-secrets.server"
import { capacitorCorsHeaders, withCors } from "~/lib/capacitor-cors"
import { HealthSamplesIngestSchema } from "~/tracking/lib/health-samples-body"
import type { Route } from "./+types/api.tracking.health-samples"

const CORS_METHODS = "POST, OPTIONS"
const CORS_ALLOW_HEADERS = "Authorization, Content-Type, X-Device-Secret"

const corsFor = (request: Request): Record<string, string> =>
  capacitorCorsHeaders(request, CORS_METHODS, { allowHeaders: CORS_ALLOW_HEADERS })

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const cors = corsFor(request)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors })
  }
  return Response.json({ ok: false, error: "Method not allowed" }, { status: 405, headers: cors })
}

export async function action({ request }: Route.ActionArgs): Promise<Response> {
  const cors = corsFor(request)
  const headers = () => withCors(new Headers(), cors)

  const ctx = await resolveDeviceSecretContext(request)
  if (!ctx.authenticated) {
    return Response.json(
      { ok: false, error: "Not authenticated." },
      { status: 401, headers: headers() }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request body." },
      { status: 400, headers: headers() }
    )
  }
  const parsed = HealthSamplesIngestSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Invalid health-samples payload." },
      { status: 400, headers: headers() }
    )
  }

  const samples: readonly HealthSample[] = parsed.data.samples.map((s) => ({
    metric: s.metric,
    startedAt: s.startedAt,
    endedAt: s.endedAt,
    value: s.value,
    unit: s.unit,
    sourceName: s.sourceName,
  }))

  const report = await upsertHealthSamples({ samples })

  return Response.json({ ok: true, ...report }, { headers: headers() })
}
