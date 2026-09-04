import {
  DEVICE_SECRET_HEADER,
  deviceSecretPresented,
  mintDeviceSecret as mintOverTheStore,
  revokeDeviceSecret as revokeOverTheStore,
} from "@akasha/person-system/device-secret-keeping"

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

/**
 * Whether the store admits the credential this request presents — and nothing else.
 *
 * `resolveDeviceSecretContext` below collapses "the secret is wrong" and "the store did not
 * answer" into a throw and a `false`, which is right for a route that has data to guard and
 * wrong for the one caller that wants to know WHICH refusal it met. A phone re-minting on the
 * first is healing; a phone re-minting on the second rotates its credential every time the
 * workstation blinks. So the three outcomes are carried out whole and the route answers each
 * with its own status.
 */
export type DeviceSecretAdmission = "admitted" | "refused" | "unread"

export async function readDeviceSecretAdmission(request: Request): Promise<DeviceSecretAdmission> {
  const read = await deviceSecretPresented(request.headers.get(DEVICE_SECRET_HEADER))
  if (read.outcome === "unread") {
    process.stderr.write(`[device-secret] admission unread: ${read.why}\n`)
    return "unread"
  }
  if (read.outcome === "refused") {
    process.stderr.write(`[device-secret] admission refused: ${read.why}\n`)
    return "refused"
  }
  return "admitted"
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
