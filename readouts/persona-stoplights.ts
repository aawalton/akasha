import { comparePageSeq } from "../page/page-seq.ts"
import type { DailyTierColor } from "./circle/tier/tier.ts"
import type { ReadoutSortOrder } from "./readout-catalog.ts"
import { readingUnitOf } from "./circle/measure/measure.ts"
import { type Ask, drawnOrder, type ResolvedReadout, readReadoutGroupReadings, resolveReadoutGroup } from "./readout-resolver.ts"
import { readoutCircle } from "./readout-scale-shape.ts"
import type { StoplightCircle } from "./circle/circle.ts"
import { type PersonaDayUnits, readPersonaDaily } from "./daily-stoplights.ts"

const PERSONAS_GROUP_SLUG = "personas"

export interface PersonaNamedUnits extends PersonaDayUnits {
  readonly name: string | null
  readonly seq: number | null
  readonly personaId: string
  readonly slug: string | null
}

export interface PersonaStoplight extends StoplightCircle {
  readonly persona: string
  readonly value: string
}

function bySlugOf(personas: readonly PersonaNamedUnits[]): ReadonlyMap<string, PersonaNamedUnits> {
  const bySlug = new Map<string, PersonaNamedUnits>()
  for (const persona of personas) {
    if (persona.slug !== null) bySlug.set(persona.slug, persona)
  }
  return bySlug
}

function drawnPersonaOrder(
  readouts: readonly ResolvedReadout[],
  bySlug: ReadonlyMap<string, PersonaNamedUnits>,
  sortOrder: ReadoutSortOrder
): readonly ResolvedReadout[] {
  const standing = readouts.filter((readout) => bySlug.has(readout.slug))
  const bySeq = [...standing].sort((a, b) =>
    comparePageSeq(bySlug.get(a.slug)?.seq ?? null, bySlug.get(b.slug)?.seq ?? null)
  )
  return drawnOrder(bySeq, sortOrder)
}

export function drawPersonaStoplights(
  readouts: readonly ResolvedReadout[],
  readings: ReadonlyMap<string, number | null>,
  personas: readonly PersonaNamedUnits[],
  sortOrder: ReadoutSortOrder
): readonly PersonaStoplight[] {
  const bySlug = bySlugOf(personas)
  return drawnPersonaOrder(readouts, bySlug, sortOrder).map((readout) => ({
    persona: readout.label,
    value: bySlug.get(readout.slug)?.valueSlug ?? "",
    ...readoutCircle({
      reading: readings.get(readout.slug) ?? null,
      scale: readout.scale,
      unit: readingUnitOf(readout.unit),
    }),
  }))
}

export interface PersonaDayColour {
  readonly personaId: string
  readonly slug: string | null
  readonly name: string
  readonly valueSlug: string
  readonly greenDayUnits: number
  readonly tier: DailyTierColor
}

export function drawPersonaDayColours(
  readouts: readonly ResolvedReadout[],
  readings: ReadonlyMap<string, number | null>,
  personas: readonly PersonaNamedUnits[],
  sortOrder: ReadoutSortOrder
): readonly PersonaDayColour[] {
  const bySlug = bySlugOf(personas)
  const out: PersonaDayColour[] = []
  for (const readout of drawnPersonaOrder(readouts, bySlug, sortOrder)) {
    const persona = bySlug.get(readout.slug)
    if (persona === undefined) continue
    const reading = readings.get(readout.slug) ?? null
    out.push({
      personaId: persona.personaId,
      slug: persona.slug,
      name: readout.label,
      valueSlug: persona.valueSlug,
      greenDayUnits: reading ?? 0,
      tier: readoutCircle({
        reading,
        scale: readout.scale,
        unit: readingUnitOf(readout.unit),
      }).tier,
    })
  }
  return out
}

interface PersonaGroupHeld {
  readonly readouts: readonly ResolvedReadout[]
  readonly readings: ReadonlyMap<string, number | null>
  readonly personas: readonly PersonaNamedUnits[]
  readonly sortOrder: ReadoutSortOrder
}

export interface PersonaArgs {
  readonly day: string
  readonly ask?: Ask
}

async function readPersonaGroup(args: PersonaArgs): Promise<PersonaGroupHeld> {
  const group = await resolveReadoutGroup(PERSONAS_GROUP_SLUG)
  const [personas, read] = await Promise.all([
    readPersonaDaily(args),
    readReadoutGroupReadings(group.readouts, args.day, args.ask),
  ])
  return { readouts: group.readouts, readings: read.readings, personas, sortOrder: group.sortOrder }
}

export async function getPersonaDayColours(
  args: PersonaArgs
): Promise<readonly PersonaDayColour[]> {
  const held = await readPersonaGroup(args)
  return drawPersonaDayColours(held.readouts, held.readings, held.personas, held.sortOrder)
}

export async function getPersonaStoplights(
  args: PersonaArgs
): Promise<readonly PersonaStoplight[]> {
  const held = await readPersonaGroup(args)
  return drawPersonaStoplights(held.readouts, held.readings, held.personas, held.sortOrder)
}
