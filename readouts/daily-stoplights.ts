import { comparePageSeq } from "../page/page-seq.ts"
import type { DailyTierColor } from "./ring/tier/tier.ts"
import { readingUnitOf } from "./ring/measure/measure.ts"
import { type Ask, askOr, type QueryRow, type ResolvedReadout, readReadoutGroupReadings, resolveReadoutGroup, resolveReadoutGroupLegend } from "./readout-resolver.ts"
import { readoutRing } from "./readout-scale-shape.ts"
import { GREEN_DAY_UNITS_LADDER, greenDayUnits } from "./ring/ladder/ladder.ts"
import { ladderFloor, type StoplightRing } from "./ring/ring.ts"

const VALUES_GROUP_SLUG = "values"

const PERSONA_QUERY = "persona-all"
const VALUE_QUERY = "value-all"
const PERSONA_DAY_QUERY = "persona-days-on-day"
const POINTS_PROP_ID = "points"

export async function getValuesLegend(): Promise<string> {
  return resolveReadoutGroupLegend(VALUES_GROUP_SLUG)
}

const COLOR_GLYPH: Record<DailyTierColor, string> = {
  black: "⚫",
  red: "🔴",
  yellow: "🟡",
  green: "🟢",
  blue: "🔵",
}

export interface PersonaDayUnits {
  readonly valueSlug: string
  readonly greenDayUnits: number
}

export interface PersonaDaily extends PersonaDayUnits {
  readonly name: string | null
  readonly seq: number | null
  readonly lastMessagedAt: string | null
  readonly personaId: string
  readonly slug: string | null
}

export function aggregateValueUnits(
  personas: readonly PersonaDayUnits[]
): ReadonlyMap<string, number> {
  const sums = new Map<string, number>()
  for (const persona of personas) {
    const prior = sums.get(persona.valueSlug) ?? 0
    sums.set(persona.valueSlug, prior + ladderFloor(persona.greenDayUnits, GREEN_DAY_UNITS_LADDER))
  }
  return sums
}

export interface ValueStoplight extends StoplightRing {
  readonly value: string
  readonly label: string
}

export interface ValueFace {
  readonly value: string
  readonly face: string | null
}

export interface ValueStoplightFace extends ValueStoplight {
  readonly face: string | null
}

export interface DailyValues {
  readonly glyphs: string
  readonly faces: readonly ValueFace[]
}

function faceOf(personas: readonly PersonaDaily[]): string | null {
  const named = personas.filter((persona) => persona.name !== null)
  const overdue = [...named].sort((a, b) => {
    if (a.lastMessagedAt !== b.lastMessagedAt) {
      if (a.lastMessagedAt === null) return -1
      if (b.lastMessagedAt === null) return 1
      return a.lastMessagedAt < b.lastMessagedAt ? -1 : 1
    }
    return comparePageSeq(a.seq, b.seq)
  })
  return overdue[0]?.name ?? null
}

function servingPersonas(
  personas: readonly PersonaDaily[]
): ReadonlyMap<string, readonly PersonaDaily[]> {
  const served = new Map<string, PersonaDaily[]>()
  for (const persona of personas) {
    const already = served.get(persona.valueSlug)
    if (already === undefined) served.set(persona.valueSlug, [persona])
    else already.push(persona)
  }
  return served
}

export function drawValueStoplights(
  readouts: readonly ResolvedReadout[],
  readings: ReadonlyMap<string, number | null>,
  personas: readonly PersonaDaily[]
): readonly ValueStoplightFace[] {
  const served = servingPersonas(personas)
  return readouts.map((readout) => {
    const serving = served.get(readout.slug)
    return {
      ...readoutRing({
        reading: readings.get(readout.slug) ?? null,
        scale: readout.scale,
        unit: readingUnitOf(readout.unit),
      }),
      value: readout.slug,
      label: readout.label,
      face: serving === undefined ? null : faceOf(serving),
    }
  })
}

export interface DailyArgs {
  readonly day: string
  readonly ask?: Ask
}

export async function getDailyStoplightFaces(
  args: DailyArgs
): Promise<readonly ValueStoplightFace[]> {
  const group = await resolveReadoutGroup(VALUES_GROUP_SLUG)
  const [personas, read] = await Promise.all([
    readPersonaDaily(args),
    readReadoutGroupReadings(group.readouts, args.day, args.ask),
  ])
  return drawValueStoplights(group.readouts, read.readings, personas)
}

export async function getDailyValues(args: DailyArgs): Promise<DailyValues> {
  const circles = await getDailyStoplightFaces(args)
  return {
    glyphs: circles.map((circle) => COLOR_GLYPH[circle.tier]).join(""),
    faces: circles.map((circle) => ({ value: circle.value, face: circle.face })),
  }
}

export interface PerfectDay {
  readonly green: boolean
  readonly blue: boolean
}

export function perfectDayFromTiers(
  tiers: readonly { readonly tier: DailyTierColor }[],
  drawnCount: number
): PerfectDay {
  const complete = drawnCount > 0 && tiers.length === drawnCount
  return {
    green: complete && tiers.every((s) => s.tier === "green" || s.tier === "blue"),
    blue: complete && tiers.every((s) => s.tier === "blue"),
  }
}

export async function getDailyPerfectDay(args: DailyArgs): Promise<PerfectDay> {
  const [group, circles] = await Promise.all([
    resolveReadoutGroup(VALUES_GROUP_SLUG),
    getDailyStoplightFaces(args),
  ])
  return perfectDayFromTiers(circles, group.readouts.length)
}

function textIn(values: Readonly<Record<string, unknown>>, key: string): string | null {
  const held = values[key]
  return typeof held === "string" && held !== "" ? held : null
}

function numberIn(values: Readonly<Record<string, unknown>>, key: string): number | null {
  const held = values[key]
  if (held === null || held === undefined || held === "") return null
  const read = typeof held === "number" ? held : Number(held)
  return Number.isFinite(read) ? read : null
}

interface ValueRow {
  readonly id: string
  readonly title: string | null
  readonly parentSlug: string | null
}

function topLevelValueSlug(
  bySlug: ReadonlyMap<string, ValueRow>,
  drawn: ReadonlySet<string>,
  valueSlug: string
): string | undefined {
  const seen = new Set<string>()
  let cur: string | undefined = valueSlug.toLowerCase()
  while (cur !== undefined && !drawn.has(cur) && !seen.has(cur)) {
    seen.add(cur)
    cur = bySlug.get(cur)?.parentSlug ?? undefined
  }
  if (cur === undefined) return undefined
  const slug = cur
  return drawn.has(slug) ? slug : undefined
}

function buildValueRowsBySlug(rows: readonly QueryRow[]): ReadonlyMap<string, ValueRow> {
  const map = new Map<string, ValueRow>()
  for (const row of rows) {
    const id = textIn(row.values, "id")
    if (id === null) continue
    const title = textIn(row.values, "title")
    const slug = (textIn(row.values, "slug") ?? title ?? "").toLowerCase()
    if (slug === "") continue
    const parent = textIn(row.values, "domain-parents-slugs")
    map.set(slug, { id, title, parentSlug: parent === "value" ? null : parent })
  }
  return map
}

function buildPointsByPersonaSlug(rows: readonly QueryRow[]): ReadonlyMap<string, number> {
  const map = new Map<string, number>()
  for (const row of rows) {
    const personaSlug = textIn(row.values, "persona-slug")
    if (personaSlug === null) continue
    map.set(personaSlug, numberIn(row.values, POINTS_PROP_ID) ?? 0)
  }
  return map
}

export async function readPersonaDaily(args: DailyArgs): Promise<PersonaDaily[]> {
  const ask = askOr(args.ask)
  const group = await resolveReadoutGroup(VALUES_GROUP_SLUG)
  const drawnValues = new Set(group.readouts.map((readout) => readout.slug))
  if (drawnValues.size === 0) return []
  const [valueAnswer, personaAnswer, progressAnswer] = await Promise.all([
    ask(VALUE_QUERY, {}),
    ask(PERSONA_QUERY, {}),
    ask(PERSONA_DAY_QUERY, { date: args.day }),
  ])

  const valueRowsBySlug = buildValueRowsBySlug(valueAnswer.rows)
  const pointsByPersonaSlug = buildPointsByPersonaSlug(progressAnswer.rows)

  const personas: PersonaDaily[] = []
  for (const row of personaAnswer.rows) {
    const id = textIn(row.values, "id")
    if (id === null) continue
    const stated = textIn(row.values, "value-slug") ?? textIn(row.values, "value")
    if (stated === null) continue
    const valueSlug = topLevelValueSlug(valueRowsBySlug, drawnValues, stated)
    if (valueSlug === undefined) continue
    const title = textIn(row.values, "title")
    const slug = textIn(row.values, "slug")
    const points = pointsByPersonaSlug.get((slug ?? title ?? "").toLowerCase()) ?? 0
    const stampedPoints = numberIn(row.values, "green-day-points")
    personas.push({
      valueSlug,
      greenDayUnits: greenDayUnits(points, stampedPoints ?? undefined),
      name: title ?? slug,
      seq: numberIn(row.values, "seq"),
      lastMessagedAt: textIn(row.values, "last-messaged-at"),
      personaId: id,
      slug,
    })
  }

  return personas
}
