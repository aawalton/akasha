import {
  type SignedIn,
  signedInAs,
} from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
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
import { holdsRouteAccessFor } from "akasha/alan/web/.server/route-access-holding/route-access-holding.module.code.ts"
import { DEVICE_SECRET_HEADER } from "akasha/person/modules/device-secret-keeping/device-secret-keeping.module.code.ts"
import {
  asAccount,
  asContributor,
  type Whom,
} from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { ROUTE_TARGETS } from "akasha/person/modules/route-access/route-access.module.code.ts"

export type DeviceSecretResolver = (request: Request) => Promise<DeviceSecretContext>

export type SessionResolver = (request: Request) => Promise<DeviceTokenContext>

export type ContributorResolver = (request: Request) => Promise<SignedIn | null>

async function permitting(whom: Whom): Promise<Response | null> {
  const permitted = await holdsRouteAccessFor(whom, ROUTE_TARGETS.READOUT_FEED)
  return permitted ? null : buildReadoutRefusal()
}

export async function guardReadout(
  request: Request,
  resolveCredential: DeviceSecretResolver = resolveDeviceSecretContext,
  resolveSession: SessionResolver = resolveDeviceTokenContext,
  resolveContributor: ContributorResolver = signedInAs
): Promise<Response | null> {
  if (request.headers.get(DEVICE_SECRET_HEADER) === null) {
    const signed = await resolveContributor(request)
    if (signed !== null) return permitting(asContributor(signed.contributor))
    const session = await resolveSession(request)
    return session.authenticated ? permitting(asAccount(session.userId)) : buildReadoutRefusal()
  }
  const credential = await resolveCredential(request)
  if (credential.outcome === "unread") {
    return Response.json(
      { ok: false },
      { status: 503, headers: { "Cache-Control": READOUT_CACHE_CONTROL } }
    )
  }
  if (credential.outcome === "refused") return buildReadoutRefusal()
  return permitting(credential.whom)
}
