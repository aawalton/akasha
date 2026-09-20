import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { alanAccountId } from "akasha/alan/web/.server/alan-session-reader/alan-session-reader.module.code.ts"
import {
  actionOnlyLoader,
  capacitorCorsHeaders,
  withCors,
} from "akasha/alan/web/modules/capacitor-cors/capacitor-cors.module.code.ts"
import { registerDeviceToken } from "akasha/person/modules/device-token-registration/device-token-registration.module.code.ts"
import { ALANWALTON_PUSH_APP } from "akasha/person/modules/push-apps/push-apps.module.code.ts"
import { registerDeviceTokenSchema } from "akasha/person/modules/push-register-body/push-register-body.module.code.ts"

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
  const parsed = registerDeviceTokenSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Invalid device token registration." },
      { status: 400, headers: withCors(headers, cors) }
    )
  }

  await registerDeviceToken({
    userId: (await alanAccountId(signedIn.contributor)) ?? "",
    contributor: signedIn.contributor,
    deviceTokenRegistration: parsed.data.deviceToken,
    platform: parsed.data.platform,
    pushType: parsed.data.pushType,
    bundleId: ALANWALTON_PUSH_APP.bundleId,
  })
  return Response.json({ ok: true }, { headers: withCors(headers, cors) })
}
