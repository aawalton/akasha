import { patchPage, writePage } from "@shared/pages-query"
import { askComposed } from "@shared/pages-query/ask"
import { DEVICE_SECRET_HEADER, readPresentedDeviceSecret } from "./device-secret"
import {
  type DeviceSecretStanding,
  generateDeviceSecret,
  hashDeviceSecret,
  verifyDeviceSecret,
} from "./device-secret-crypto.server"

const PAGE_TYPE = "device-secret"

const WRITER = "device-secrets"

export type DeviceSecretContext =
  | { readonly authenticated: true; readonly userId: string }
  | { readonly authenticated: false }

function pageNameOf(userId: string, deviceId: string): string {
  return `${userId}/${deviceId}`
}

function textOf(values: Readonly<Record<string, unknown>>, key: string): string | null {
  const held = values[key]
  return typeof held === "string" && held !== "" ? held : null
}

interface Found {
  readonly standing: DeviceSecretStanding
  readonly name: string
}

function foundIn(values: Readonly<Record<string, unknown>>): Found | null {
  const userId = textOf(values, "user-id")
  const deviceId = textOf(values, "device-id")
  const secretHash = textOf(values, "secret-hash")
  if (userId === null || deviceId === null || secretHash === null) return null
  return {
    standing: { userId, secretHash, revokedAt: textOf(values, "revoked-at") },
    name: pageNameOf(userId, deviceId),
  }
}

export async function mintDeviceSecret(args: {
  userId: string
  deviceId: string
}): Promise<string> {
  const secret = generateDeviceSecret()
  const landed = await writePage(
    PAGE_TYPE,
    pageNameOf(args.userId, args.deviceId),
    {
      "user-id": args.userId,
      "device-id": args.deviceId,
      "secret-hash": hashDeviceSecret(secret),
    },
    WRITER
  )
  if (!landed.ok) throw new Error(`device-secrets mint failed: ${landed.why}`)
  return secret
}

export async function revokeDeviceSecret(args: {
  userId: string
  deviceId: string
}): Promise<void> {
  const asked = await askComposed({
    "page-type": PAGE_TYPE,
    where: { "user-id": { is: args.userId }, "device-id": { is: args.deviceId } },
  })
  if (!asked.ok) throw new Error(`device-secrets revoke failed: ${asked.why}`)
  const standing = asked.answer.rows.find(
    (row) =>
      textOf(row.values, "user-id") === args.userId &&
      textOf(row.values, "device-id") === args.deviceId
  )
  if (standing === undefined) return
  if (textOf(standing.values, "revoked-at") !== null) return
  const landed = await patchPage(
    PAGE_TYPE,
    pageNameOf(args.userId, args.deviceId),
    { "revoked-at": new Date().toISOString() },
    WRITER
  )
  if (!landed.ok) throw new Error(`device-secrets revoke failed: ${landed.why}`)
}

export async function resolveDeviceSecretContext(request: Request): Promise<DeviceSecretContext> {
  const presented = readPresentedDeviceSecret(request.headers.get(DEVICE_SECRET_HEADER))
  if (!presented.ok) return { authenticated: false }

  const presentedHash = hashDeviceSecret(presented.secret)
  const asked = await askComposed({
    "page-type": PAGE_TYPE,
    where: { "secret-hash": { is: presentedHash } },
  })
  if (!asked.ok) throw new Error(`device-secrets lookup failed: ${asked.why}`)

  const matched = asked.answer.rows.filter(
    (row) => textOf(row.values, "secret-hash") === presentedHash
  )
  if (matched.length > 1) {
    throw new Error("device-secrets lookup failed: one hash stands on more than one secret")
  }
  const found = matched[0] === undefined ? null : foundIn(matched[0].values)
  const verified = verifyDeviceSecret({ standing: found?.standing ?? null, presentedHash })
  if (!verified.ok || found === null) return { authenticated: false }

  const touched = await patchPage(
    PAGE_TYPE,
    found.name,
    { "last-used-at": new Date().toISOString() },
    WRITER
  )
  if (!touched.ok) throw new Error(`device-secrets touch failed: ${touched.why}`)

  return { authenticated: true, userId: verified.userId }
}
