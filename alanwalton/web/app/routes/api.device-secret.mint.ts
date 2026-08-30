import { MintDeviceSecretSchema } from "~/device-secret/lib/device-secret"
import { mintDeviceSecret } from "~/device-secret/lib/device-secrets.server"
import { capacitorCorsHeaders, withCors } from "~/lib/capacitor-cors"
import { holdsRouteAccess, ROUTE_TARGETS } from "~/person-access/lib/route-access.server"
import { resolveDeviceTokenContext } from "~/push/lib/device-tokens.server"
import type { Route } from "./+types/api.device-secret.mint"

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

  if (!(await holdsRouteAccess(ctx.userId, ROUTE_TARGETS.DEVICE_SECRET_MINT))) {
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
  const parsed = MintDeviceSecretSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Invalid device secret mint." },
      { status: 400, headers: withCors(ctx.headers, cors) }
    )
  }

  const deviceSecret = await mintDeviceSecret({
    userId: ctx.userId,
    deviceId: parsed.data.deviceId,
  })
  return Response.json({ ok: true, deviceSecret }, { headers: withCors(ctx.headers, cors) })
}
