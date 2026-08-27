import { z } from "zod"

export const GateDimensionSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    suspendableWhen: z.string().min(1).optional(),
  })
  .strict()
export type GateDimension = z.infer<typeof GateDimensionSchema>
