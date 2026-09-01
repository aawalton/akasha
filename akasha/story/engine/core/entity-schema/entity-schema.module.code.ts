import { z } from "zod"

export const EntitySheetSchema = z
  .object({
    name: z.string().optional(),
    kind: z.string().optional(),
    level: z.number().optional(),
    class: z.string().optional(),
    attributes: z.record(z.string(), z.unknown()).optional(),
    skills: z.array(z.unknown()).optional(),
    affinities: z.array(z.unknown()).optional(),
    bonds: z.array(z.unknown()).optional(),
    equipment: z.record(z.string(), z.unknown()).optional(),
    inventory: z.array(z.unknown()).optional(),
    traits: z.array(z.unknown()).optional(),
    titles: z.array(z.unknown()).optional(),
  })
  .passthrough()
export type EntitySheet = z.infer<typeof EntitySheetSchema>
