import { z } from "zod"

export const RevealedSheetSchema = z.object({
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
  titles: z.array(z.unknown()).optional(),
  derived: z.record(z.string(), z.number()).optional(),
})
export type RevealedSheet = z.infer<typeof RevealedSheetSchema>

export type RevealKey = keyof RevealedSheet & string

const REVEAL_UNIVERSE_KEY_SET = new Set<string>(Object.keys(RevealedSheetSchema.shape))
export const REVEAL_UNIVERSE_KEYS: readonly RevealKey[] = Object.keys(
  RevealedSheetSchema.shape
).filter((k): k is RevealKey => REVEAL_UNIVERSE_KEY_SET.has(k))

export const RevealKeySchema = z.string().refine((k) => REVEAL_UNIVERSE_KEY_SET.has(k), {
  message: "reveal key outside the code universe (the never-reveal floor)",
})

export const DEFAULT_REVEAL_KEYS: readonly RevealKey[] = REVEAL_UNIVERSE_KEYS

export function narrowRevealed(revealed: RevealedSheet, keys: readonly string[]): RevealedSheet {
  const allow = new Set<string>(keys)
  const picked: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(revealed)) {
    if (allow.has(key)) picked[key] = value
  }
  return RevealedSheetSchema.parse(picked)
}
