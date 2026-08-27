import { registerDeviceToken } from "@shared/notifications/device-token"
import { ALANWALTON_PUSH_APP } from "@shared/notifications/push-apps"
import { capacitorCorsHeaders, withCors } from "~/lib/capacitor-cors"
import { resolveDeviceTokenContext } from "~/push/lib/device-tokens.server"
import { RegisterDeviceTokenSchema } from "~/push/lib/register-body"
import type { Route } from "./+types/api.push.register"

const CORS_METHODS = "POST, OPTIONS"

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors })
  }
  return Response.json({ ok: false, error: "Method not allowed" }, { status: 405, headers: cors })
}

export async function action({ request }: Route.ActionArgs): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  const ctx = await resolveDeviceTokenContext(request)
  if (!ctx.authenticated) {
    return Response.json(
      { ok: false, error: "Not authenticated." },
      { status: 401, headers: withCors(ctx.headers, cors) }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request body." },
      { status: 400, headers: withCors(ctx.headers, cors) }
    )
  }
  const parsed = RegisterDeviceTokenSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Invalid device token registration." },
      { status: 400, headers: withCors(ctx.headers, cors) }
    )
  }

  await registerDeviceToken({
    userId: ctx.userId,
    deviceToken: parsed.data.deviceToken,
    platform: parsed.data.platform,
    bundleId: ALANWALTON_PUSH_APP.bundleId,
  })
  return Response.json({ ok: true }, { headers: withCors(ctx.headers, cors) })
}
