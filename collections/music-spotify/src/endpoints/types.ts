import { z } from "zod"

export interface EndpointProbe {
  readonly name: string
  readonly run: () => Promise<unknown>
  readonly manual?: boolean
}

export interface EndpointDescriptor {
  readonly name: string
  readonly scopes: readonly string[]
  readonly probes: readonly EndpointProbe[]
}

export const endpointDescriptorSchema = z
  .object({
    name: z.string().min(1),
    scopes: z.array(z.string()),
    probes: z.array(
      z
        .object({
          name: z.string().min(1),
          run: z.custom<() => Promise<unknown>>((v) => typeof v === "function"),
          manual: z.boolean().optional(),
        })
        .strict()
    ),
  })
  .strict()
