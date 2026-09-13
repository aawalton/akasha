import type { ReadonlyJSONValue } from "akasha/alan/track/daily/modules/day-narrow-types/day-narrow-types.module.code.ts"
import { numberOf } from "akasha/alan/track/daily/modules/day-scan-window/day-scan-window.module.code.ts"
import { z } from "zod"

export const PersonaSessionRowSchema = z
  .object({
    id: z.string(),
    slug: z.string().optional(),
    title: z.string().optional(),
    valueSlug: z.string().optional(),
    greenDayPoints: z.number().optional(),
  })
  .passthrough()

export interface SessionTotalsOutcome {
  readonly personaTitle: string
  readonly total: number
}

export interface SessionPointsPlan {
  readonly outcomes: readonly SessionTotalsOutcome[]
}

function planSessionPointsWrites(
  total: number,
  personas: readonly z.infer<typeof PersonaSessionRowSchema>[]
): SessionPointsPlan {
  const outcomes: SessionTotalsOutcome[] = []

  for (const persona of personas) {
    outcomes.push({
      personaTitle: persona.title ?? persona.id,
      total,
    })
  }

  return { outcomes }
}

export function planPersonaSessionWrite(
  total: number,
  persona: z.infer<typeof PersonaSessionRowSchema> | null
): SessionPointsPlan {
  if (persona === null) return { outcomes: [] }
  return planSessionPointsWrites(total, [persona])
}

function resolveSessionPointsForValue(
  row: Readonly<Record<string, ReadonlyJSONValue>>,
  pointsPropId: string
): number {
  return numberOf(row[pointsPropId]) ?? 0
}

export function sumSessionPointsForValue(
  rows: readonly Readonly<Record<string, ReadonlyJSONValue>>[],
  pointsPropId: string
): number {
  let total = 0
  for (const row of rows) total += resolveSessionPointsForValue(row, pointsPropId)
  return total
}
