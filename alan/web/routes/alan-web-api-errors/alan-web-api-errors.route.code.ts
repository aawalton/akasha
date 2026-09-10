import { computeFingerprint } from "@akasha/errors-core/error-fingerprint"
import { ErrorReportSchema } from "@akasha/errors-core/error-report"
import { captureError, type ErrorCapturePayload } from "@akasha/pages-access/capture-error"

const SHELL_ORIGINS: readonly string[] = ["https://alanwalton.com", "capacitor://localhost"]

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("Origin")
  return origin !== null && SHELL_ORIGINS.includes(origin)
    ? {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
        Vary: "Origin",
      }
    : {}
}

export async function loader({ request }: { request: Request }): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(request) })
  }
  return Response.json(
    { error: "method-not-allowed" },
    { status: 405, headers: corsHeaders(request) }
  )
}

export async function action({ request }: { request: Request }): Promise<Response> {
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
