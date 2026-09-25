import {
  type SignedIn,
  signedInAs,
} from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import {
  countTap,
  type Tapped,
} from "akasha/alan/harness/readout/modules/widget-tap-counting/widget-tap-counting.module.code.ts"
import {
  capacitorCorsHeaders,
  withCors,
} from "akasha/alan/web/modules/capacitor-cors/capacitor-cors.module.code.ts"

const CORS_METHODS = "POST, OPTIONS"

type ReadsSignedIn = (request: Request) => Promise<SignedIn | null>

type TapCounter = (slug: string, at: Date) => Promise<Tapped | null>

function widgetIn(body: unknown): string | null {
  if (typeof body !== "object" || body === null) return null
  const widget = (body as { widget?: unknown }).widget
  return typeof widget === "string" && widget !== "" ? widget : null
}

export function answerWidgetTapAsked(request: Request): Response {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors })
  return Response.json({ ok: false, error: "A tap is carried in." }, { status: 405, headers: cors })
}

export async function answerWidgetTap(
  request: Request,
  readSignedIn: ReadsSignedIn = signedInAs,
  count: TapCounter = countTap
): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  const headers = new Headers()
  if ((await readSignedIn(request)) === null) {
    return Response.json(
      { ok: false, error: "Not authenticated." },
      { status: 401, headers: withCors(headers, cors) }
    )
  }

  const widget = widgetIn(await request.json().catch(() => null))
  if (widget === null) {
    return Response.json(
      { ok: false, error: "No widget." },
      { status: 400, headers: withCors(headers, cors) }
    )
  }

  const tapped = await count(widget, new Date())
  if (tapped === null) {
    return Response.json(
      { ok: false, error: "No such widget." },
      { status: 404, headers: withCors(headers, cors) }
    )
  }
  return Response.json(
    { ok: true, widget, taps: tapped.taps, at: tapped.at },
    { headers: withCors(headers, cors) }
  )
}
