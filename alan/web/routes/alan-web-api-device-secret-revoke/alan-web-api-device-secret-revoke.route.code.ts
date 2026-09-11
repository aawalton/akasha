import { revokeDeviceSecretSchema } from "akasha/persons/device-secret-body/device-secret-body.module.code.ts"
import { revokeDeviceSecret } from "../../.server/device-secret-context/device-secret-context.module.code.ts"
import { resolveDeviceTokenContext } from "../../.server/device-token-context/device-token-context.module.code.ts"
import {
  actionOnlyLoader,
  capacitorCorsHeaders,
  withCors,
} from "../../capacitor-cors/capacitor-cors.module.code.ts"

const CORS_METHODS = "POST, OPTIONS"

export const loader = actionOnlyLoader(CORS_METHODS)

export async function action({ request }: { request: Request }): Promise<Response> {
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
  const parsed = revokeDeviceSecretSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Invalid device secret revoke." },
      { status: 400, headers: withCors(ctx.headers, cors) }
    )
  }

  await revokeDeviceSecret({
    userId: ctx.userId,
    deviceId: parsed.data.deviceId,
  })
  return Response.json({ ok: true }, { headers: withCors(ctx.headers, cors) })
}
