import { greenDayPointsOf } from "@akasha/personas-core/green-day-fraction"
import { askComposed, pageLanding } from "@tools/lib/page-query-client"
import { z } from "zod"
import type { WriteOutcome } from "../day-narrow-types/day-narrow-types.module.code.ts"
import { kebabKey, WRITER } from "../day-scan-window/day-scan-window.module.code.ts"
import { personaRecipeRows } from "../persona-recipe-rows/persona-recipe-rows.module.code.ts"

export const PERSONA_DAY_PAGE_TYPE_SLUG = "persona-day"

export const CARDIO_PERSONA_TITLE = "Aelwyn"

export interface PersonaDayTarget {
  readonly id: string
  readonly slug: string
  readonly title: string
  readonly valueSlug?: string | undefined
  readonly greenDayPoints: number
}

const PersonaRowSchema = z
  .object({
    id: z.string(),
    slug: z.string().optional(),
    title: z.string().optional(),
    valueSlug: z.string().optional(),
    greenDayPoints: z.number().optional(),
  })
  .passthrough()

export async function resolvePersonaBySlug(slug: string): Promise<PersonaDayTarget> {
  const rows = await personaRecipeRows()
  const wanted = slug.toLowerCase()
  const match = rows
    .map((r) => PersonaRowSchema.parse(r))
    .find((r) => (r.slug ?? "").toLowerCase() === wanted)
  if (match === undefined) throw new Error(`resolvePersonaBySlug: no persona slugged "${slug}"`)
  return {
    id: match.id,
    slug: match.slug ?? wanted,
    title: match.title ?? slug,
    ...(match.valueSlug === undefined ? {} : { valueSlug: match.valueSlug }),
    greenDayPoints: greenDayPointsOf({
      slug: match.slug ?? wanted,
      greenDayPoints: match.greenDayPoints,
    }),
  }
}

export function personaDaySlug(personaSlug: string, dayStr: string): string {
  return `${personaSlug}-${dayStr}`
}

async function personaDayStands(personaSlug: string, dayStr: string): Promise<boolean> {
  const asked = await askComposed({
    "page-type": PERSONA_DAY_PAGE_TYPE_SLUG,
    keys: ["persona-slug", "date"],
    where: { "persona-slug": { is: personaSlug }, date: { is: dayStr } },
    limit: 1,
  })
  if (!asked.ok) {
    throw new Error(
      `personaDayStands: whether \`${personaDaySlug(personaSlug, dayStr)}\` is already written could not be read, so nothing is written over: ${asked.why}`
    )
  }
  return asked.rows.length > 0
}

async function patchPersonaDayFields(
  dayStr: string,
  fields: Readonly<Record<string, number>>,
  persona: PersonaDayTarget
): Promise<WriteOutcome> {
  const stood = await personaDayStands(persona.slug, dayStr)
  const named = personaDaySlug(persona.slug, dayStr)
  const values: Record<string, string | number> = {
    slug: named,
    "persona-slug": persona.slug,
    date: dayStr,
    "green-day-points": persona.greenDayPoints,
  }
  if (persona.valueSlug !== undefined) values["value-slug"] = persona.valueSlug
  if (!stood) {
    values["id"] = Bun.randomUUIDv7()
    values["source-points"] = 0
  }
  for (const [key, value] of Object.entries(fields)) values[kebabKey(key)] = value

  const landed = await pageLanding("patch", PERSONA_DAY_PAGE_TYPE_SLUG, named, values, WRITER)
  if (!landed.ok) {
    throw new Error(`the persona day \`${named}\` did not land: ${landed.why}`)
  }
  return stood ? "patched" : "created"
}

export async function patchPersonaDayField(
  dayStr: string,
  field: string,
  value: number,
  persona: PersonaDayTarget
): Promise<WriteOutcome> {
  return patchPersonaDayFields(dayStr, { [field]: value }, persona)
}
