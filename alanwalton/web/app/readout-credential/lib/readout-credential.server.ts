import { timingSafeEqual } from "node:crypto"
import { z } from "zod"
import {
  type DeviceSecretContext,
  resolveDeviceSecretContext,
} from "~/device-secret/lib/device-secrets.server"
import { holdsRouteAccess, ROUTE_TARGETS } from "~/person-access/lib/route-access.server"
import { buildReadoutRefusal } from "./readout-credential"

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

export const RELAY_SECRET_HEADER = "X-Relay-Secret"

function constantTimeEquals(a: string, b: string): boolean {
  const left = Buffer.from(a, "utf8")
  const right = Buffer.from(b, "utf8")
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

const configuredRelaySecret = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value === undefined || value === "" ? undefined : value))

function presentsRelaySecret(request: Request): boolean {
  const expected = configuredRelaySecret.parse(process.env.SMILINGJENNY_RELAY_SECRET)
  if (expected === undefined) return false
  const presented = request.headers.get(RELAY_SECRET_HEADER)
  if (presented === null) return false
  return constantTimeEquals(presented, expected)
}

export async function guardRingReadout(
  request: Request,
  resolveCredential: DeviceSecretResolver = resolveDeviceSecretContext
): Promise<Response | null> {
  if (presentsRelaySecret(request)) return null
  return guardReadout(request, resolveCredential)
}
