import { z } from "zod"

export const registerDeviceTokenSchema = z
  .object({
    deviceToken: z.string().min(1),
    platform: z.enum(["ios"]),
    pushType: z.enum(["alert", "liveactivity"]).optional(),
  })
  .strict()
