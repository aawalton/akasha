import { z } from "zod"

const statusBarStoplightsSchema = z.object({
  glyphs: z.string(),
  legend: z.string(),
})

export const statusBarStateSchema = z.object({
  workstation: z
    .object({ processorPct: z.number().nullable(), memoryGb: z.number().nullable() })
    .nullable(),
  usage: z
    .object({ sessionPct: z.number().nullable(), weeklyPct: z.number().nullable() })
    .nullable(),
  inbox: statusBarStoplightsSchema.nullable(),
  upkeep: statusBarStoplightsSchema.nullable(),
  attributes: statusBarStoplightsSchema.nullable(),
})

export type StatusBarState = z.infer<typeof statusBarStateSchema>
