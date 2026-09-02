import { computeFingerprint } from "@akasha/errors-core/error-fingerprint"
import { ErrorReportSchema } from "@akasha/errors-core/error-report"
import { captureError, type ErrorCapturePayload } from "@akasha/pages-access/capture-error"
import type { Route } from "./+types/api.errors"

const CAPACITOR_ORIGIN = "capacitor://localhost"

function corsHeaders(request: Request): Record<string, string> {
  return request.headers.get("Origin") === CAPACITOR_ORIGIN
    ? {
        "Access-Control-Allow-Origin": CAPACITOR_ORIGIN,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
        Vary: "Origin",
      }
    : {}
}

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(request) })
  }
  return Response.json(
    { error: "method-not-allowed" },
    { status: 405, headers: corsHeaders(request) }
  )
}

export async function action({ request }: Route.ActionArgs): Promise<Response> {
  const cors = corsHeaders(request)
  if (request.method !== "POST") {
    return Response.json({ error: "method-not-allowed" }, { status: 405, headers: cors })
  }

  let rawBody: unknown
  try {
    rawBody = await request.json()
  } catch {
    return Response.json({ error: "invalid-json" }, { status: 400, headers: cors })
  }

  const parsed = ErrorReportSchema.safeParse(rawBody)
  if (!parsed.success) {
    return Response.json({ error: "invalid-payload" }, { status: 400, headers: cors })
  }

  const fingerprint = computeFingerprint(parsed.data)
  const payload: ErrorCapturePayload = {
    ...parsed.data,
    fingerprint,
    releaseSha: parsed.data.releaseSha ?? undefined,
  }

  try {
    await captureError(payload)
  } catch (thrown) {
    console.error(`api/errors: ${thrown instanceof Error ? thrown.message : String(thrown)}`)
    return Response.json({ error: "capture-failed" }, { status: 500, headers: cors })
  }

  return new Response(null, { status: 204, headers: cors })
}
