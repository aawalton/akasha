import { z } from "zod"

export type InferenceHost = {
  readonly name: string
  readonly address: string
  readonly loginUser: string
  readonly keyPath: string
  readonly home: string
  readonly condaScript: string
}

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
