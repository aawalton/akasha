import { getEsoDayWindow } from "@akasha/day/eso-day"
import { greenDayPointsOf } from "@akasha/personas-core/green-day-fraction"
import type { ReadonlyJSONValue } from "../day-narrow-types/day-narrow-types.module.code.ts"
import { allSessions, sessionPropertyUndeclared } from "../day-place/day-place.module.code.ts"
import {
  numberOf,
  SOURCE_POINTS_FIELD,
  textOf,
  WRITER,
} from "../day-scan-window/day-scan-window.module.code.ts"
import {
  type PersonaDayTarget,
  patchPersonaDayField,
} from "../persona-day-points/persona-day-points.module.code.ts"
import { personaRecipeRows } from "../persona-recipe-rows/persona-recipe-rows.module.code.ts"
import { landTotalPoints } from "../persona-total-landing/persona-total-landing.module.code.ts"
import {
  PersonaSessionRowSchema,
  planPersonaSessionWrite,
  type SessionTotalsOutcome,
  sumSessionPointsForValue,
  sumSessionPointsForWindow,
} from "../session-points-compute/session-points-compute.module.code.ts"

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

  const { patches, outcomes } = planPersonaSessionWrite(total, persona)
  for (const patch of patches) {
    const landed = await landTotalPoints(patch.pageTypeSlug, patch.slug, patch.totalPoints, WRITER)
    if (!landed.ok) throw new Error(`the ${patch.slug} session total went unwritten: ${landed.why}`)
  }

  return { outcomes, undeclared: null }
}

export interface SessionDailyOutcome {
  readonly dayStr: string
  readonly personaTitle: string
  readonly sourcePoints: number
  readonly outcome: "created" | "patched"
}

export interface SessionDailyReport {
  readonly days: readonly SessionDailyOutcome[]
  readonly undeclared: string | null
}

export async function writeSessionPointsDailyForPersona(
  spec: PersonaSessionSpec,
  dayStrs: readonly string[]
): Promise<SessionDailyReport> {
  const source = await readSessionPointsSource(spec)
  if (source.undeclared !== null) return { days: [], undeclared: source.undeclared }

  const personaRaw = await personaFor(spec.personaSlug)
  if (personaRaw === undefined) return { days: [], undeclared: null }
  const persona = PersonaSessionRowSchema.parse(personaRaw)
  const target: PersonaDayTarget = {
    id: persona.id,
    slug: persona.slug ?? persona.id,
    title: persona.title ?? persona.slug ?? persona.id,
    ...(persona.valueSlug === undefined ? {} : { valueSlug: persona.valueSlug }),
    greenDayPoints: greenDayPointsOf({
      slug: persona.slug ?? persona.id,
      greenDayPoints: numberOf(persona.greenDayPoints),
    }),
  }

  const days: SessionDailyOutcome[] = []
  for (const dayStr of dayStrs) {
    const raw = sumSessionPointsForWindow(source.rows, spec.pointsPropId, getEsoDayWindow(dayStr))
    const sourcePoints = Math.max(0, raw)
    const outcome = await patchPersonaDayField(dayStr, SOURCE_POINTS_FIELD, sourcePoints, target)
    days.push({ dayStr, personaTitle: target.title, sourcePoints, outcome })
  }
  return { days, undeclared: null }
}
