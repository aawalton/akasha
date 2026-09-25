import { z } from "zod"

const statusBarStoplightsSchema = z.object({
  glyphs: z.string(),
  legend: z.string(),
})

export const statusBarStateSchema = z.object({
  workstation: z.record(z.string(), z.number().nullable()).nullable(),
  usage: z
    .object({ sessionPct: z.number().nullable(), weeklyPct: z.number().nullable() })
    .nullable(),
  inbox: statusBarStoplightsSchema.nullable(),
  upkeep: statusBarStoplightsSchema.nullable(),
  attributes: statusBarStoplightsSchema.nullable(),
})

export type StatusBarStoplights = z.infer<typeof statusBarStoplightsSchema>

export type StatusBarState = z.infer<typeof statusBarStateSchema>
