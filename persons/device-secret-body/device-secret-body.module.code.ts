import { hasDeviceSecretShape } from "akasha/persons/device-secret-shape/device-secret-shape.module.code.ts"
import { z } from "zod"

export const mintDeviceSecretSchema = z.object({ deviceId: z.string().min(1) }).strict()

export const revokeDeviceSecretSchema = z.object({ deviceId: z.string().min(1) }).strict()

export const mintDeviceSecretResponseSchema = z
  .object({
    ok: z.literal(true),
    deviceSecret: z.string().refine(hasDeviceSecretShape, "not a dvs_v1_ device secret"),
  })
  .passthrough()
