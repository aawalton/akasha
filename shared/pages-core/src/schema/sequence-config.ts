import { z } from "zod"

export const sequenceConfigSchema = z
  .object({
    groupBy: z.string().min(1),
    orderBy: z.string().min(1),
    direction: z.enum(["asc", "desc"]).optional(),
  })
  .strict()

export type SequenceConfig = z.infer<typeof sequenceConfigSchema>

export function parseSequenceConfig(value: unknown): SequenceConfig | null {
  const parsed = sequenceConfigSchema.safeParse(value)
  return parsed.success ? parsed.data : null
}
