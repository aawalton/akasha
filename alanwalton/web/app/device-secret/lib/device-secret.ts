import {
  DEVICE_SECRET_HEADER,
  DEVICE_SECRET_PREFIX,
  DEVICE_SECRET_RANDOM_BYTES,
  hasDeviceSecretShape,
  type Presented as PresentedDeviceSecret,
  readPresentedDeviceSecret,
} from "@akasha/person-system/device-secret-standing"
import { z } from "zod"

export {
  DEVICE_SECRET_HEADER,
  DEVICE_SECRET_PREFIX,
  DEVICE_SECRET_RANDOM_BYTES,
  hasDeviceSecretShape,
  readPresentedDeviceSecret,
}

export type { PresentedDeviceSecret }

export const MintDeviceSecretSchema = z.object({ deviceId: z.string().min(1) }).strict()

export const RevokeDeviceSecretSchema = z.object({ deviceId: z.string().min(1) }).strict()

export const MintDeviceSecretResponseSchema = z
  .object({
    ok: z.literal(true),
    deviceSecret: z.string().refine(hasDeviceSecretShape, "not a dvs_v1_ device secret"),
  })
  .passthrough()
