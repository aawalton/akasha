import { createHash, randomBytes, timingSafeEqual } from "node:crypto"
import { DEVICE_SECRET_PREFIX, DEVICE_SECRET_RANDOM_BYTES } from "./device-secret"

export function generateDeviceSecret(): string {
  return `${DEVICE_SECRET_PREFIX}${randomBytes(DEVICE_SECRET_RANDOM_BYTES).toString("base64url")}`
}

export function hashDeviceSecret(secret: string): string {
  return createHash("sha256").update(secret, "utf8").digest("hex")
}

export function deviceSecretHashesEqual(a: string, b: string): boolean {
  const left = Buffer.from(a, "utf8")
  const right = Buffer.from(b, "utf8")
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

export type DeviceSecretStanding = {
  readonly userId: string
  readonly secretHash: string
  readonly revokedAt: string | null
}

export type DeviceSecretVerification =
  | { readonly ok: true; readonly userId: string }
  | { readonly ok: false; readonly reason: "unknown" | "revoked" | "mismatch" }

export function verifyDeviceSecret(args: {
  standing: DeviceSecretStanding | null
  presentedHash: string
}): DeviceSecretVerification {
  const { standing, presentedHash } = args
  if (standing === null) return { ok: false, reason: "unknown" }
  if (standing.revokedAt !== null) return { ok: false, reason: "revoked" }
  if (!deviceSecretHashesEqual(standing.secretHash, presentedHash))
    return { ok: false, reason: "mismatch" }
  return { ok: true, userId: standing.userId }
}
