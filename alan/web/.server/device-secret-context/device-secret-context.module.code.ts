import type { Fetcher, Sleeper } from "@akasha/pages/service/calling"
import {
  DEVICE_SECRET_HEADER,
  deviceSecretPresented,
  mintDeviceSecret as mintOverTheStore,
  revokeDeviceSecret as revokeOverTheStore,
} from "akasha/persons/device-secret-keeping/device-secret-keeping.module.code.ts"

export type DeviceSecretAdmission = "admitted" | "refused" | "unread"

export type DeviceSecretContext =
  | { readonly outcome: "admitted"; readonly userId: string }
  | { readonly outcome: "refused" }
  | { readonly outcome: "unread" }

export type MintedDeviceSecret =
  | { readonly ok: true; readonly deviceSecret: string }
  | { readonly ok: false; readonly why: string }

export async function mintDeviceSecret(args: {
  userId: string
  deviceId: string
}): Promise<MintedDeviceSecret> {
  const minted = await mintOverTheStore(args.userId, args.deviceId)
  if (!minted.ok) return { ok: false, why: minted.why }
  return { ok: true, deviceSecret: minted.secret }
}

export async function revokeDeviceSecret(args: {
  userId: string
  deviceId: string
}): Promise<void> {
  const revoked = await revokeOverTheStore(args.userId, args.deviceId)
  if (!revoked.ok) throw new Error(`device-secrets revoke failed: ${revoked.why}`)
}

export async function resolveDeviceSecretContext(
  request: Request,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<DeviceSecretContext> {
  const read = await deviceSecretPresented(request.headers.get(DEVICE_SECRET_HEADER), fetcher, naps)
  if (read.outcome === "unread") {
    process.stderr.write(`[device-secret] unread: ${read.why}\n`)
    return { outcome: "unread" }
  }
  if (read.outcome === "refused") {
    process.stderr.write(`[device-secret] refusing: ${read.why}\n`)
    return { outcome: "refused" }
  }
  return { outcome: "admitted", userId: read.userId }
}

export async function readDeviceSecretAdmission(
  request: Request,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<DeviceSecretAdmission> {
  const resolved = await resolveDeviceSecretContext(request, fetcher, naps)
  return resolved.outcome
}
