import { z } from "zod"

export const RegisterDeviceTokenSchema = z
  .object({
    deviceToken: z.string().min(1),
    platform: z.enum(["ios"]),
  })
  .strict()
