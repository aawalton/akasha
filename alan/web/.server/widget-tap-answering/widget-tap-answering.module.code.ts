import {
  countTap,
  type Tapped,
} from "akasha/readouts/widget-tap-counting/widget-tap-counting.module.code.ts"
import { capacitorCorsHeaders, withCors } from "../../capacitor-cors/capacitor-cors.module.code.ts"
import {
  type DeviceTokenContext,
  resolveDeviceTokenContext,
} from "../device-token-context/device-token-context.module.code.ts"

const CORS_METHODS = "POST, OPTIONS"

export type TokenResolver = (request: Request) => Promise<DeviceTokenContext>

export type TapCounter = (slug: string, at: Date) => Promise<Tapped | null>

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
  resolveContext: TokenResolver = resolveDeviceTokenContext,
  count: TapCounter = countTap
): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  const ctx = await resolveContext(request)
  if (!ctx.authenticated) {
    return Response.json(
      { ok: false, error: "Not authenticated." },
      { status: 401, headers: withCors(ctx.headers, cors) }
    )
  }

  const widget = widgetIn(await request.json().catch(() => null))
  if (widget === null) {
    return Response.json(
      { ok: false, error: "No widget." },
      { status: 400, headers: withCors(ctx.headers, cors) }
    )
  }

  const tapped = await count(widget, new Date())
  if (tapped === null) {
    return Response.json(
      { ok: false, error: "No such widget." },
      { status: 404, headers: withCors(ctx.headers, cors) }
    )
  }
  return Response.json(
    { ok: true, widget, taps: tapped.taps, at: tapped.at },
    { headers: withCors(ctx.headers, cors) }
  )
}
