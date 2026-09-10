import { mintDeviceSecretSchema } from "@akasha/persons/device-secret-body"
import { ROUTE_TARGETS } from "@akasha/persons/route-access"
import { mintDeviceSecret } from "../../.server/device-secret-context/device-secret-context.module.code.ts"
import { resolveDeviceTokenContext } from "../../.server/device-token-context/device-token-context.module.code.ts"
import { holdsRouteAccess } from "../../.server/route-access-holding/route-access-holding.module.code.ts"
import { capacitorCorsHeaders, withCors } from "../../capacitor-cors/capacitor-cors.module.code.ts"

const CORS_METHODS = "POST, OPTIONS"

export async function loader({ request }: { request: Request }): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors })
  }
  return Response.json({ ok: false, error: "Method not allowed" }, { status: 405, headers: cors })
}

export async function action({ request }: { request: Request }): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  const ctx = await resolveDeviceTokenContext(request)
  if (!ctx.authenticated) {
    process.stderr.write("[device-secret] mint refused: the request carries no session\n")
    return Response.json(
      { ok: false, error: "Not authenticated." },
      { status: 401, headers: withCors(ctx.headers, cors) }
    )
  }

  if (!(await holdsRouteAccess(ctx.userId, ROUTE_TARGETS.DEVICE_SECRET_MINT))) {
    process.stderr.write(
      "[device-secret] mint refused: the session holds no device-secret-mint access, or the store did not answer\n"
    )
    return Response.json(
      { ok: false, error: "Not authenticated." },
      { status: 401, headers: withCors(ctx.headers, cors) }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    process.stderr.write("[device-secret] mint refused: the body did not parse as JSON\n")
    return Response.json(
      { ok: false, error: "Invalid request body." },
      { status: 400, headers: withCors(ctx.headers, cors) }
    )
  }
  const parsed = mintDeviceSecretSchema.safeParse(body)
  if (!parsed.success) {
    process.stderr.write("[device-secret] mint refused: the body names no device id\n")
    return Response.json(
      { ok: false, error: "Invalid device secret mint." },
      { status: 400, headers: withCors(ctx.headers, cors) }
    )
  }
  process.stderr.write("[device-secret] mint reached the store\n")

  const minted = await mintDeviceSecret({
    userId: ctx.userId,
    deviceId: parsed.data.deviceId,
  })
  if (!minted.ok) {
    process.stderr.write(`[device-secret] mint refused: ${minted.why}\n`)
    return Response.json(
      { ok: false, error: "Device secret not minted." },
      { status: 500, headers: withCors(ctx.headers, cors) }
    )
  }
  return Response.json(
    { ok: true, deviceSecret: minted.deviceSecret },
    { headers: withCors(ctx.headers, cors) }
  )
}
