import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { alanAccountId } from "akasha/alan/web/.server/alan-session-reader/alan-session-reader.module.code.ts"
import { revokeDeviceSecret } from "akasha/alan/web/.server/device-secret-context/device-secret-context.module.code.ts"
import {
  actionOnlyLoader,
  capacitorCorsHeaders,
  withCors,
} from "akasha/alan/web/modules/capacitor-cors/capacitor-cors.module.code.ts"
import { revokeDeviceSecretSchema } from "akasha/person/modules/device-secret-body/device-secret-body.module.code.ts"

const CORS_METHODS = "POST, OPTIONS"

export const loader = actionOnlyLoader(CORS_METHODS)

export async function action({ request }: { request: Request }): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  const headers = new Headers()
  const signedIn = await signedInAs(request)
  if (signedIn === null) {
    return Response.json(
      { ok: false, error: "Not authenticated." },
      { status: 401, headers: withCors(headers, cors) }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request body." },
      { status: 400, headers: withCors(headers, cors) }
    )
  }
  const parsed = revokeDeviceSecretSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Invalid device secret revoke." },
      { status: 400, headers: withCors(headers, cors) }
    )
  }

  await revokeDeviceSecret({
    userId: (await alanAccountId(signedIn.contributor)) ?? "",
    deviceId: parsed.data.deviceId,
    request,
  })
  return Response.json({ ok: true }, { headers: withCors(headers, cors) })
}
