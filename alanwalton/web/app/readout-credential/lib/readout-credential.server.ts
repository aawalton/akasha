import {
  presentsSecret,
  RELAY_SECRET_HEADER,
} from "../../../../../akasha/readout-system/readout-credential/readout-credential.module.code.ts"
import {
  type DeviceSecretContext,
  resolveDeviceSecretContext,
} from "~/device-secret/lib/device-secrets.server"
import { holdsRouteAccess, ROUTE_TARGETS } from "~/person-access/lib/route-access.server"
import { buildReadoutRefusal } from "../../../../../akasha/readout-system/readout-credential/readout-credential.module.code.ts"

export type DeviceSecretResolver = (request: Request) => Promise<DeviceSecretContext>

export async function guardReadout(
  request: Request,
  resolveCredential: DeviceSecretResolver = resolveDeviceSecretContext
): Promise<Response | null> {
  const credential = await resolveCredential(request)
  if (!credential.authenticated) return buildReadoutRefusal()
  const permitted = await holdsRouteAccess(credential.userId, ROUTE_TARGETS.READOUT_FEED)
  return permitted ? null : buildReadoutRefusal()
}

function presentsRelaySecret(request: Request): boolean {
  return presentsSecret(request, RELAY_SECRET_HEADER, process.env.SMILINGJENNY_RELAY_SECRET)
}

export async function guardRingReadout(
  request: Request,
  resolveCredential: DeviceSecretResolver = resolveDeviceSecretContext
): Promise<Response | null> {
  if (presentsRelaySecret(request)) return null
  return guardReadout(request, resolveCredential)
}
