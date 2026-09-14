import { z } from "zod"

export const PoolChangeSchema = z
  .object({
    pool: z.string().min(1),
    delta: z.number(),
    newTotal: z.number(),
  })
  .strict()
export type PoolChange = z.infer<typeof PoolChangeSchema>
