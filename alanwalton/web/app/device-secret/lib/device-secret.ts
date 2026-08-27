import { z } from "zod"

export const DEVICE_SECRET_HEADER = "X-Device-Secret"

export const DEVICE_SECRET_PREFIX = "dvs_v1_"

export const DEVICE_SECRET_RANDOM_BYTES = 32
const DEVICE_SECRET_BODY_LENGTH = 43

const DEVICE_SECRET_RE = new RegExp(
  `^${DEVICE_SECRET_PREFIX}[A-Za-z0-9_-]{${DEVICE_SECRET_BODY_LENGTH}}$`
)

export function hasDeviceSecretShape(value: string): boolean {
  return DEVICE_SECRET_RE.test(value)
}

export type PresentedDeviceSecret =
  | { readonly ok: true; readonly secret: string }
  | { readonly ok: false; readonly reason: "absent" | "malformed" }

export function readPresentedDeviceSecret(headerValue: string | null): PresentedDeviceSecret {
  if (headerValue === null || headerValue === "") return { ok: false, reason: "absent" }
  if (!hasDeviceSecretShape(headerValue)) return { ok: false, reason: "malformed" }
  return { ok: true, secret: headerValue }
}

export const MintDeviceSecretSchema = z.object({ deviceId: z.string().min(1) }).strict()

export const RevokeDeviceSecretSchema = z.object({ deviceId: z.string().min(1) }).strict()

export const MintDeviceSecretResponseSchema = z
  .object({
    ok: z.literal(true),
    deviceSecret: z.string().refine(hasDeviceSecretShape, "not a dvs_v1_ device secret"),
  })
  .passthrough()
