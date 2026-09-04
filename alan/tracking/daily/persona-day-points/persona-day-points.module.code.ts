import { landedMechanically } from "@akasha/command-system/asking"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { refuseALiveTestWrite } from "@akasha/pages-system/live-store-write-guard"
import { asking } from "@akasha/pages-system-service/asking"
import { composedFor } from "@akasha/pages-system-service/composing"
import { greenDayPointsOf } from "@akasha/personas-core/green-day-fraction"
import { z } from "zod"
import type { WriteOutcome } from "../day-narrow-types/day-narrow-types.module.code.ts"
import { WRITER } from "../day-scan-window/day-scan-window.module.code.ts"
import { personaRecipeRows } from "../persona-recipe-rows/persona-recipe-rows.module.code.ts"
import { camelizeKey } from "../tracking-keys/tracking-keys.module.code.ts"

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

function checkoutRoot(): string {
  return rootFor(resolveRoots(), AKASHA)
}

function personaDayHeld(root: string, named: string): Readonly<Record<string, unknown>> | null {
  const asked = asking(root, {
    pageTypeSlug: PERSONA_DAY_PAGE_TYPE_SLUG,
    where: { slug: { is: named } },
    limit: 1,
  } as never)
  if ("refused" in asked) {
    throw new Error(
      `whether the persona day \`${named}\` is already written could not be read, so nothing is ` +
        `written over: ${asked.refused}`
    )
  }
  return (asked.rows[0] as Readonly<Record<string, unknown>> | undefined) ?? null
}

async function patchPersonaDayFields(
  dayStr: string,
  fields: Readonly<Record<string, number>>,
  persona: PersonaDayTarget
): Promise<WriteOutcome> {
  const root = checkoutRoot()
  const named = personaDaySlug(persona.slug, dayStr)
  const held = personaDayHeld(root, named)
  const values: Record<string, unknown> = {
    ...(held ?? {}),
    pageTypeSlug: PERSONA_DAY_PAGE_TYPE_SLUG,
    slug: named,
    personaSlug: persona.slug,
    date: dayStr,
    greenDayPoints: persona.greenDayPoints,
  }
  if (persona.valueSlug !== undefined) values["valueSlug"] = persona.valueSlug
  if (held === null) {
    values["id"] = Bun.randomUUIDv7()
    values["sourcePoints"] = 0
  }
  for (const [key, value] of Object.entries(fields)) values[camelizeKey(key)] = value

  const composed = composedFor(root, {
    pageTypeSlug: PERSONA_DAY_PAGE_TYPE_SLUG,
    slug: named,
    values,
  })
  if ("refused" in composed) {
    throw new Error(`the persona day \`${named}\` did not compose: ${composed.refused}`)
  }
  if (composed.kept !== null) {
    throw new Error(
      `\`${PERSONA_DAY_PAGE_TYPE_SLUG}\` declares a property kept outside the commit and this ` +
        `writes none; ${composed.kept.path} would carry ${Object.keys(composed.kept.values).join(", ")}`
    )
  }
  refuseALiveTestWrite(root, `write ${PERSONA_DAY_PAGE_TYPE_SLUG}/${named}`, "`patchPersonaDay`")
  const landed = await landedMechanically(
    root,
    WRITER,
    [{ path: composed.put.path, body: new TextEncoder().encode(composed.put.content) }],
    `${WRITER}: the persona day ${named}`
  )
  if (landed.code !== 0) {
    throw new Error(`the persona day \`${named}\` did not land: ${landed.refusals.join("; ")}`)
  }
  return held === null ? "created" : "patched"
}

export async function patchPersonaDayField(
  dayStr: string,
  field: string,
  value: number,
  persona: PersonaDayTarget
): Promise<WriteOutcome> {
  return patchPersonaDayFields(dayStr, { [field]: value }, persona)
}
