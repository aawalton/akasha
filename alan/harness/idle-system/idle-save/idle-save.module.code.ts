import { z } from "zod"

const teammateSchema = z.looseObject({
  slug: z.string(),
  name: z.string(),
  color: z.string(),
  portrait: z.string(),
  flavor: z.string(),
  owned: z.boolean().optional(),
  cost: z.number(),
  rate: z.number(),
  rank: z.number(),
  level: z.number().nullable(),
  stage: z.string(),
  affinity: z.string().optional(),
  locked: z.boolean().optional(),
})

const gachaGirlSchema = z.object({
  stars: z.number(),
  dupeProgress: z.number(),
  images: z.array(z.string()),
  frontImage: z.string().optional(),
})

const gachaSchema = z.object({
  girls: z.record(z.string(), gachaGirlSchema),
  cycleDraws: z.number(),
})

export const idleSaveSchema = z.looseObject({
  resource: z.number(),
  teammates: z.array(teammateSchema),
  lastTickAt: z.number(),
  gacha: gachaSchema.optional(),
  ranksZeroIndexed: z.boolean().optional(),
})

export type IdleSave = z.infer<typeof idleSaveSchema>

const jsonSaveSchema = z.json()

export type JsonSave = z.infer<typeof jsonSaveSchema>

export function parseIdleSave(input: unknown): IdleSave {
  return idleSaveSchema.parse(input)
}

export function toJsonSave(save: IdleSave): JsonSave {
  return jsonSaveSchema.parse(JSON.parse(JSON.stringify(save)))
}
