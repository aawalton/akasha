import { computeFingerprint } from "akasha/alan/harness/errors-core/error-fingerprint/error-fingerprint.module.code.ts"
import { ErrorReportSchema } from "akasha/alan/harness/errors-core/error-report/error-report.module.code.ts"
import {
  captureError,
  type ErrorCapturePayload,
} from "akasha/pages/access/modules/capture-error/capture-error.module.code.ts"

function corsHeaders(request: Request, shellOrigins: readonly string[]): Record<string, string> {
  const origin = request.headers.get("Origin")
  return origin !== null && shellOrigins.includes(origin)
    ? {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
        Vary: "Origin",
      }
    : {}
}

export function answerErrorPreflight(request: Request, shellOrigins: readonly string[]): Response {
  const cors = corsHeaders(request, shellOrigins)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors })
  }
  return Response.json({ error: "method-not-allowed" }, { status: 405, headers: cors })
}

export async function answerErrorReport(
  request: Request,
  shellOrigins: readonly string[]
): Promise<Response> {
  const cors = corsHeaders(request, shellOrigins)
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
