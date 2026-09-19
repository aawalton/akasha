import {
  buildReadoutRefusal,
  READOUT_CACHE_CONTROL,
} from "akasha/alan/harness/readout/modules/credential/readout-credential.module.code.ts"
import {
  type DeviceSecretContext,
  resolveDeviceSecretContext,
} from "akasha/alan/web/.server/device-secret-context/device-secret-context.module.code.ts"
import {
  type DeviceTokenContext,
  resolveDeviceTokenContext,
} from "akasha/alan/web/.server/device-token-context/device-token-context.module.code.ts"
import { holdsRouteAccess } from "akasha/alan/web/.server/route-access-holding/route-access-holding.module.code.ts"
import { DEVICE_SECRET_HEADER } from "akasha/person/modules/device-secret-keeping/device-secret-keeping.module.code.ts"
import { ROUTE_TARGETS } from "akasha/person/modules/route-access/route-access.module.code.ts"

export type DeviceSecretResolver = (request: Request) => Promise<DeviceSecretContext>

export type SessionResolver = (request: Request) => Promise<DeviceTokenContext>

async function permitting(userId: string): Promise<Response | null> {
  const permitted = await holdsRouteAccess(userId, ROUTE_TARGETS.READOUT_FEED)
  return permitted ? null : buildReadoutRefusal()
}

export async function guardReadout(
  request: Request,
  resolveCredential: DeviceSecretResolver = resolveDeviceSecretContext,
  resolveSession: SessionResolver = resolveDeviceTokenContext
): Promise<Response | null> {
  if (request.headers.get(DEVICE_SECRET_HEADER) === null) {
    const session = await resolveSession(request)
    return session.authenticated ? permitting(session.userId) : buildReadoutRefusal()
  }
  const credential = await resolveCredential(request)
  if (credential.outcome === "unread") {
    return Response.json(
      { ok: false },
      { status: 503, headers: { "Cache-Control": READOUT_CACHE_CONTROL } }
    )
  }
  if (credential.outcome === "refused") return buildReadoutRefusal()
  return permitting(credential.userId)
}
