import { ROUTE_TARGETS } from "akasha/persons/route-access/route-access.module.code.ts"
import { buildReadoutRefusal } from "akasha/readouts/credential/readout-credential.module.code.ts"
import {
  type DeviceSecretContext,
  resolveDeviceSecretContext,
} from "../device-secret-context/device-secret-context.module.code.ts"
import { holdsRouteAccess } from "../route-access-holding/route-access-holding.module.code.ts"

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
