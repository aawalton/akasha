import { z } from "zod"

export const AnswerSchema = z.object({
  n: z.number(),
  value: z.number().nullable().default(null),
  over: z.number().nullable().default(null),
  rows: z
    .array(z.object({ at: z.string().optional(), values: z.record(z.string(), z.unknown()) }))
    .default([]),
  faults: z.array(z.string()).default([]),
  omitted: z.array(z.string()).default([]),
  unfound: z.array(z.string()).default([]),
})

export type QueryAnswer = z.infer<typeof AnswerSchema>
export type QueryRow = QueryAnswer["rows"][number]
