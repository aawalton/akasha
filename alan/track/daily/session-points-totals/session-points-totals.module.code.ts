import type { ReadonlyJSONValue } from "akasha/alan/track/daily/day-narrow-types/day-narrow-types.module.code.ts"
import { textOf } from "akasha/alan/track/daily/day-scan-window/day-scan-window.module.code.ts"
import {
  allSessions,
  sessionPropertyUndeclared,
} from "akasha/alan/track/daily/day-stretches/day-stretches.module.code.ts"
import { personaRecipeRows } from "akasha/alan/track/daily/persona-recipe-rows/persona-recipe-rows.module.code.ts"
import {
  PersonaSessionRowSchema,
  planPersonaSessionWrite,
  type SessionTotalsOutcome,
  sumSessionPointsForValue,
} from "akasha/alan/track/daily/session-points-compute/session-points-compute.module.code.ts"

export interface PersonaSessionSpec {
  readonly personaSlug: string
  readonly pointsPropId: string
}

export const VISUAL_ARTS_SESSION_SPEC: PersonaSessionSpec = {
  personaSlug: "zeli",
  pointsPropId: "visual-arts-points",
}

export const PRAYER_SESSION_SPEC: PersonaSessionSpec = {
  personaSlug: "selah",
  pointsPropId: "prayer-points",
}

export const ROMANCE_SESSION_SPEC: PersonaSessionSpec = {
  personaSlug: "ruby",
  pointsPropId: "romance-points",
}

export const SESSION_SPECS_BY_SLUG: Readonly<Record<string, PersonaSessionSpec>> = {
  zeli: VISUAL_ARTS_SESSION_SPEC,
  selah: PRAYER_SESSION_SPEC,
  ruby: ROMANCE_SESSION_SPEC,
}

export interface SessionPointsSource {
  readonly rows: readonly Readonly<Record<string, ReadonlyJSONValue>>[]
  readonly undeclared: string | null
}

async function loadAllSessionRows(): Promise<
  readonly Readonly<Record<string, ReadonlyJSONValue>>[]
> {
  const { rows } = await allSessions()
  return rows.map((row) => row.values as Readonly<Record<string, ReadonlyJSONValue>>)
}

export async function readSessionPointsSource(
  spec: PersonaSessionSpec
): Promise<SessionPointsSource> {
  const [rows, undeclared] = await Promise.all([
    loadAllSessionRows(),
    sessionPropertyUndeclared(spec.pointsPropId),
  ])
  return { rows, undeclared }
}

async function personaFor(
  personaSlug: string
): Promise<Readonly<Record<string, unknown>> | undefined> {
  return (await personaRecipeRows()).find((row) => textOf(row.slug) === personaSlug)
}

export interface SessionTotalsReport {
  readonly outcomes: readonly SessionTotalsOutcome[]
  readonly undeclared: string | null
}

export async function writeSessionPointsTotalForPersona(
  spec: PersonaSessionSpec
): Promise<SessionTotalsReport> {
  const source = await readSessionPointsSource(spec)
  if (source.undeclared !== null) return { outcomes: [], undeclared: source.undeclared }

  const total = sumSessionPointsForValue(source.rows, spec.pointsPropId)

  const personaRaw = await personaFor(spec.personaSlug)
  const persona = personaRaw === undefined ? null : PersonaSessionRowSchema.parse(personaRaw)

  const { outcomes } = planPersonaSessionWrite(total, persona)

  return { outcomes, undeclared: null }
}
