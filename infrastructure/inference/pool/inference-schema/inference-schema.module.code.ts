import { z } from "zod"

export const InferenceHostSchema = z
  .object({
    name: z.string().min(1),
    address: z.string().min(1),
    user: z.string().min(1),
    keyPath: z.string().min(1),
    home: z.string().min(1),
    condaSh: z.string().min(1),
  })
  .strict()
export type InferenceHost = z.infer<typeof InferenceHostSchema>

export const ActualResourceSchema = z
  .object({
    name: z.string().min(1),
    dirPresent: z.boolean(),
    inputsHash: z.string().nullable(),
    launchdLoaded: z.boolean(),
    condaEnvPresent: z.boolean(),
    condaEnvHealthy: z.boolean(),
  })
  .strict()
export type ActualResource = z.infer<typeof ActualResourceSchema>
