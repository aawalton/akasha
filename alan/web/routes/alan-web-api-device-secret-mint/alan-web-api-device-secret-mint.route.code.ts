import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { alanAccountId } from "akasha/alan/web/.server/alan-session-reader/alan-session-reader.module.code.ts"
import { mintDeviceSecret } from "akasha/alan/web/.server/device-secret-context/device-secret-context.module.code.ts"
import { holdsRouteAccess } from "akasha/alan/web/.server/route-access-holding/route-access-holding.module.code.ts"
import {
  actionOnlyLoader,
  capacitorCorsHeaders,
  withCors,
} from "akasha/alan/web/modules/capacitor-cors/capacitor-cors.module.code.ts"
import { mintDeviceSecretSchema } from "akasha/person/modules/device-secret-body/device-secret-body.module.code.ts"
import { ROUTE_TARGETS } from "akasha/person/modules/route-access/route-access.module.code.ts"

const CORS_METHODS = "POST, OPTIONS"

export const loader = actionOnlyLoader(CORS_METHODS)

export async function action({ request }: { request: Request }): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  const headers = new Headers()
  const signedIn = await signedInAs(request)
  if (signedIn === null) {
    process.stderr.write("[device-secret] mint refused: the request carries no session\n")
    return Response.json(
      { ok: false, error: "Not authenticated." },
      { status: 401, headers: withCors(headers, cors) }
    )
  }

  const userId = (await alanAccountId(signedIn.contributor)) ?? ""

  if (!(await holdsRouteAccess(userId, ROUTE_TARGETS.DEVICE_SECRET_MINT, request))) {
    process.stderr.write(
      "[device-secret] mint refused: the session holds no device-secret-mint access, or the store did not answer\n"
    )
    return Response.json(
      { ok: false, error: "Not authenticated." },
      { status: 401, headers: withCors(headers, cors) }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    process.stderr.write("[device-secret] mint refused: the body did not parse as JSON\n")
    return Response.json(
      { ok: false, error: "Invalid request body." },
      { status: 400, headers: withCors(headers, cors) }
    )
  }
  const parsed = mintDeviceSecretSchema.safeParse(body)
  if (!parsed.success) {
    process.stderr.write("[device-secret] mint refused: the body names no device id\n")
    return Response.json(
      { ok: false, error: "Invalid device secret mint." },
      { status: 400, headers: withCors(headers, cors) }
    )
  }
  process.stderr.write("[device-secret] mint reached the store\n")

  const minted = await mintDeviceSecret({
    userId,
    deviceId: parsed.data.deviceId,
    request,
    recovering: parsed.data.recovering === true,
  })
  if (!minted.ok) {
    process.stderr.write(`[device-secret] mint refused: ${minted.why}\n`)
    return Response.json(
      { ok: false, error: "Device secret not minted." },
      { status: 500, headers: withCors(headers, cors) }
    )
  }
  return Response.json(
    { ok: true, deviceSecret: minted.deviceSecret },
    { headers: withCors(headers, cors) }
  )
}
