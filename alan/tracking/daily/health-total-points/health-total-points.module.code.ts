import { loadActiveCaloriesByDay } from "@akasha/health-samples-day/active-calories"
import { kebabisedRow } from "@akasha/pages-system/akasha-page-values"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { asking } from "@akasha/pages-system-service/asking"
import { decideTotalPointsWrite as decideTotalPointsWriteBridge } from "@akasha/personas-core/totals"
import { z } from "zod"
import { numberOf, textOf, WRITER } from "../day-scan-window/day-scan-window.module.code.ts"
import {
  healthPersonaPopulation,
  healthTotalPopulation,
  selectHealthPersonas,
} from "../health-total-population/health-total-population.module.code.ts"
import { CARDIO_PERSONA_TITLE } from "../persona-day-points/persona-day-points.module.code.ts"
import { personaRecipeRows } from "../persona-recipe-rows/persona-recipe-rows.module.code.ts"
import { landTotalPoints } from "../persona-total-landing/persona-total-landing.module.code.ts"
import { camelizeKey } from "../tracking-keys/tracking-keys.module.code.ts"

const decideTotalPointsWrite = decideTotalPointsWriteBridge as (
  stored: number | undefined,
  computed: number,
  force?: boolean
) => number | null

const PERSONA_DAY_PAGE_TYPE_SLUG = "persona-day"
const PERSONA_PAGE_TYPE_SLUG = "persona"

const HEALTH_VALUE_SLUG = "health"

const POINTS_KEY = "points"
const PERSONA_SLUG_KEY = "persona-slug"
const ACTIVE_CALORIES_KEY = "active-calories"
const DATE_KEY = "date"

const PersonaRowSchema = z
  .object({
    id: z.string(),
    slug: z.string().optional(),
    title: z.string().optional(),
    valueSlug: z.string().optional(),
    totalPoints: z.number().optional(),
    pointsSourceKind: z.string().optional(),
  })
  .passthrough()

export interface HealthPersonaTotalOutcome {
  readonly personaId: string
  readonly personaTitle: string
  readonly personaSlug: string
  readonly totalPoints: number
  readonly storedTotalPoints: number | null
  readonly wouldWrite: number | null
  readonly personaWritten: boolean
}

export interface HealthTotalsOutcome {
  readonly personas: readonly HealthPersonaTotalOutcome[]
  readonly healthPopulation: readonly string[]
  readonly unmatchedSlugs: readonly string[]
  readonly dryRun: boolean
}

export function sumHealthPersonaDayPoints(
  rows: readonly Readonly<Record<string, unknown>>[]
): number {
  let total = 0
  for (const row of rows) total += numberOf(row[POINTS_KEY]) ?? 0
  return total
}

export function rowsForPersona(
  rows: readonly Readonly<Record<string, unknown>>[],
  personaSlug: string
): readonly Readonly<Record<string, unknown>>[] {
  return rows.filter((row) => row[PERSONA_SLUG_KEY] === personaSlug)
}

export function withDerivedActiveCalories(
  rows: readonly Readonly<Record<string, unknown>>[],
  caloriesByDay: ReadonlyMap<string, number | null>,
  cardioOwnerPersonaSlug: string
): readonly Readonly<Record<string, unknown>>[] {
  return rows.map((row) => {
    if (row[PERSONA_SLUG_KEY] !== cardioOwnerPersonaSlug) return row
    const day = textOf(row[DATE_KEY])
    if (day === undefined) return row
    const derived = caloriesByDay.get(day)
    if (derived === undefined || derived === null) return row
    const stood = numberOf(row[ACTIVE_CALORIES_KEY]) ?? 0
    const points = numberOf(row[POINTS_KEY])
    const moved: Record<string, unknown> = { ...row, [ACTIVE_CALORIES_KEY]: derived }
    if (points !== undefined) moved[POINTS_KEY] = points - stood + derived
    return moved
  })
}

async function loadDerivedActiveCalories(
  rows: readonly Readonly<Record<string, unknown>>[]
): Promise<ReadonlyMap<string, number | null>> {
  const dayStrs = [
    ...new Set(
      rows.map((row) => textOf(row[DATE_KEY])).filter((d): d is string => d !== undefined)
    ),
  ]
  if (dayStrs.length === 0) return new Map()
  const read = await loadActiveCaloriesByDay({ dayStrs })
  if (read.unread.length > 0) {
    process.stderr.write(
      `health totals: ${read.unread.length} of ${dayStrs.length} day(s) have no recorded wake, ` +
        "so no active calories were derived for them and each keeps the reading already stored\n"
    )
  }
  return read.byDay
}

function slugOf(p: z.infer<typeof PersonaRowSchema>): string {
  return (p.slug ?? p.title ?? "").toLowerCase()
}

function personaDayRows(
  personaSlugs: readonly string[]
): readonly Readonly<Record<string, unknown>>[] {
  const asked = asking(rootFor(resolveRoots(), AKASHA), {
    pageTypeSlug: PERSONA_DAY_PAGE_TYPE_SLUG,
    where: { [camelizeKey(PERSONA_SLUG_KEY)]: { in: personaSlugs } },
    keys: [PERSONA_SLUG_KEY, DATE_KEY, ACTIVE_CALORIES_KEY, POINTS_KEY].map(camelizeKey),
  } as never)
  if ("refused" in asked) throw new Error(`health totals: ${asked.refused}`)
  return asked.rows.map((one) => kebabisedRow(one as Readonly<Record<string, unknown>>))
}

export interface HealthPersonaTotalReading {
  readonly personaId: string
  readonly personaTitle: string
  readonly personaSlug: string
  readonly computedTotal: number
  readonly storedTotal: number | undefined
  readonly rowsSummed: number
  readonly pointsSourceKind: string | undefined
}

export async function readHealthPersonaTotals(): Promise<readonly HealthPersonaTotalReading[]> {
  const personaRows = (await personaRecipeRows()).map((r) => PersonaRowSchema.parse(r))
  const healthPersonas = healthPersonaPopulation(personaRows, HEALTH_VALUE_SLUG)

  const cardioOwner = healthPersonas.find(
    (p) => (p.title ?? "").trim().toLowerCase() === CARDIO_PERSONA_TITLE.trim().toLowerCase()
  )
  if (cardioOwner === undefined) {
    throw new Error(
      `health totals: no Health persona is titled ${CARDIO_PERSONA_TITLE}, so the derived active calories have no owner to land on; the cardio pillar would be silently worth zero rather than wrong`
    )
  }

  const progressRows = personaDayRows(healthPersonas.map((p) => slugOf(p)))

  const derivedActiveCalories = await loadDerivedActiveCalories(progressRows)
  const rowsWithCardio = withDerivedActiveCalories(
    progressRows,
    derivedActiveCalories,
    slugOf(cardioOwner)
  )

  return healthPersonas.map((persona) => {
    const own = rowsForPersona(rowsWithCardio, slugOf(persona))
    return {
      personaId: persona.id,
      personaTitle: persona.title ?? "",
      personaSlug: slugOf(persona),
      computedTotal: sumHealthPersonaDayPoints(own),
      storedTotal: persona.totalPoints,
      rowsSummed: own.length,
      pointsSourceKind: persona.pointsSourceKind,
    }
  })
}

export async function writeHealthTotalPoints(options?: {
  readonly force?: boolean
  readonly slugs?: readonly string[]
  readonly dryRun?: boolean
}): Promise<HealthTotalsOutcome> {
  const force = options?.force ?? false
  const dryRun = options?.dryRun ?? false

  const readings = await readHealthPersonaTotals()

  const writable = healthTotalPopulation(readings)

  const healthPopulation = writable.map((r) => r.personaSlug)
  const { selected, unmatched: unmatchedSlugs } = selectHealthPersonas(
    writable,
    (r) => r.personaSlug,
    options?.slugs
  )

  const personas: HealthPersonaTotalOutcome[] = []
  for (const reading of selected) {
    const personaWrite = decideTotalPointsWrite(reading.storedTotal, reading.computedTotal, force)
    let personaWritten = false
    if (personaWrite !== null && !dryRun) {
      const landed = await landTotalPoints(
        PERSONA_PAGE_TYPE_SLUG,
        reading.personaSlug,
        personaWrite,
        WRITER
      )
      if (!landed.ok) {
        throw new Error(`the ${reading.personaSlug} total went unwritten: ${landed.why}`)
      }
      personaWritten = true
    }
    personas.push({
      personaId: reading.personaId,
      personaTitle: reading.personaTitle,
      personaSlug: reading.personaSlug,
      totalPoints: reading.computedTotal,
      storedTotalPoints: reading.storedTotal ?? null,
      wouldWrite: personaWrite,
      personaWritten,
    })
  }

  return { personas, healthPopulation, unmatchedSlugs, dryRun }
}
