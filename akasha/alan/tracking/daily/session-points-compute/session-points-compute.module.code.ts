import { getEsoDayStr, getEsoDayWindow } from "@akasha/day/eso-day"
import { z } from "zod"
import type { ReadonlyJSONValue } from "../day-narrow-types/day-narrow-types.module.code.ts"
import { numberOf } from "../day-scan-window/day-scan-window.module.code.ts"

export const PERSONA_PAGE_TYPE_SLUG = "persona"

export const PersonaSessionRowSchema = z
  .object({
    id: z.string(),
    slug: z.string().optional(),
    title: z.string().optional(),
    valueSlug: z.string().optional(),
    greenDayPoints: z.number().optional(),
    totalPoints: z.number().optional(),
  })
  .passthrough()

export interface SessionTotalsOutcome {
  readonly personaTitle: string
  readonly total: number
  readonly personaWritten: boolean
}

export interface SessionPointsPatch {
  readonly pageTypeSlug: typeof PERSONA_PAGE_TYPE_SLUG
  readonly slug: string
  readonly totalPoints: number
}

export interface SessionPointsPlan {
  readonly patches: readonly SessionPointsPatch[]
  readonly outcomes: readonly SessionTotalsOutcome[]
}

export function planSessionPointsWrites(
  total: number,
  personas: readonly z.infer<typeof PersonaSessionRowSchema>[]
): SessionPointsPlan {
  const patches: SessionPointsPatch[] = []
  const outcomes: SessionTotalsOutcome[] = []

  for (const persona of personas) {
    const personaWrite = decideSessionTotalWrite(persona.totalPoints, total)
    if (personaWrite !== null) {
      patches.push({
        pageTypeSlug: PERSONA_PAGE_TYPE_SLUG,
        slug: persona.slug ?? persona.id,
        totalPoints: personaWrite,
      })
    }
    outcomes.push({
      personaTitle: persona.title ?? persona.id,
      total,
      personaWritten: personaWrite !== null,
    })
  }

  return { patches, outcomes }
}

export function planPersonaSessionWrite(
  total: number,
  persona: z.infer<typeof PersonaSessionRowSchema> | null
): SessionPointsPlan {
  if (persona === null) return { patches: [], outcomes: [] }
  return planSessionPointsWrites(total, [persona])
}

export function resolveSessionPointsForValue(
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

export function sessionStartTime(
  row: Readonly<Record<string, ReadonlyJSONValue>>
): Date | undefined {
  const raw = row["start-time"]
  if (typeof raw !== "string") return undefined
  const d = new Date(raw)
  return Number.isNaN(d.getTime()) ? undefined : d
}

export function filterSessionsInWindow(
  rows: readonly Readonly<Record<string, ReadonlyJSONValue>>[],
  window: { readonly start: Date; readonly end: Date }
): readonly Readonly<Record<string, ReadonlyJSONValue>>[] {
  const startMs = window.start.getTime()
  const endMs = window.end.getTime()
  return rows.filter((row) => {
    const t = sessionStartTime(row)
    if (t === undefined) return false
    const ms = t.getTime()
    return ms >= startMs && ms < endMs
  })
}

export function sumSessionPointsForWindow(
  rows: readonly Readonly<Record<string, ReadonlyJSONValue>>[],
  pointsPropId: string,
  window: { readonly start: Date; readonly end: Date }
): number {
  return sumSessionPointsForValue(filterSessionsInWindow(rows, window), pointsPropId)
}

export function discoverActiveSessionDays(
  rows: readonly Readonly<Record<string, ReadonlyJSONValue>>[],
  pointsPropId: string
): readonly string[] {
  const candidateDays = new Set<string>()
  for (const row of rows) {
    const t = sessionStartTime(row)
    if (t !== undefined) candidateDays.add(getEsoDayStr(t))
  }
  const active: string[] = []
  for (const dayStr of candidateDays) {
    const sum = sumSessionPointsForWindow(rows, pointsPropId, getEsoDayWindow(dayStr))
    if (sum > 0) active.push(dayStr)
  }
  return active.sort()
}

export function decideSessionTotalWrite(stored: number | undefined, total: number): number | null {
  return stored === total ? null : total
}
