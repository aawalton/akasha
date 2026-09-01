import {
  DEVICE_SECRET_HEADER,
  deviceSecretPresented,
  mintDeviceSecret as mintOverTheStore,
  revokeDeviceSecret as revokeOverTheStore,
} from "@akasha/person-system/device-secret-standing"

export type DeviceSecretContext =
  | { readonly authenticated: true; readonly userId: string }
  | { readonly authenticated: false }

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

export async function resolveDeviceSecretContext(request: Request): Promise<DeviceSecretContext> {
  const read = await deviceSecretPresented(request.headers.get(DEVICE_SECRET_HEADER))
  if (read.outcome === "unread") throw new Error(`device-secrets lookup failed: ${read.why}`)
  if (read.outcome === "refused") {
    process.stderr.write(`[device-secret] refusing: ${read.why}\n`)
    return { authenticated: false }
  }
  return { authenticated: true, userId: read.userId }
}
