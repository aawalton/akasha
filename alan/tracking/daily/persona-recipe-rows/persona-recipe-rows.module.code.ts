import type { Asked, Query, Row } from "@akasha/pages-system-service/asking"
import { askingFor } from "@akasha/pages-system-service/calling"
import { numberOf, textOf } from "../day-scan-window/day-scan-window.module.code.ts"

const PERSONA_PAGE_TYPE_SLUG = "persona"
const POINTS_SOURCE_PAGE_TYPE_SLUG = "persona-points-source"

const PERSONA_KEYS = ["id", "slug", "cover", "valueSlug", "greenDayPoints"] as const

const SOURCE_KEYS = {
  kind: "pointsSourceKind",
  marker: "pointsSource",
  aggregate: "pointsSourceAggregate",
  pathPrefix: "pointsPathPrefix",
  pointField: "pointsSourcePointField",
  weightField: "pointsSourceWeightField",
} as const

const PERSONA_SLUG_KEY = "personaSlug"

export const PERSONA_ASKING: Query = {
  pageTypeSlug: PERSONA_PAGE_TYPE_SLUG,
  keys: [...PERSONA_KEYS],
  sortBy: "slug",
}

export const POINTS_SOURCE_ASKING: Query = {
  pageTypeSlug: POINTS_SOURCE_PAGE_TYPE_SLUG,
  keys: [PERSONA_SLUG_KEY, ...Object.keys(SOURCE_KEYS)],
  sortBy: "slug",
}

function everyRowIn(what: string, asked: Asked): readonly Row[] {
  if ("refused" in asked) throw new Error(`${what} went unread: ${asked.refused}`)
  return asked.rows
}

function personaSlugIn(row: Row): string {
  const named = textOf(row[PERSONA_SLUG_KEY])
  if (named === undefined || named === "") {
    const slug = textOf(row.slug) ?? "a source with no slug"
    throw new Error(
      `\`${slug}\` names no persona, so the persona it earns for would earn nothing with ` +
        "nothing saying so"
    )
  }
  return named
}

export async function personaRecipeRows(): Promise<readonly Readonly<Record<string, unknown>>[]> {
  const [personas, sources] = await Promise.all([
    askingFor(PERSONA_ASKING),
    askingFor(POINTS_SOURCE_ASKING),
  ])
  const personaRows = everyRowIn(`the \`${PERSONA_PAGE_TYPE_SLUG}\` pages`, personas)
  const sourceRows = everyRowIn(`the \`${POINTS_SOURCE_PAGE_TYPE_SLUG}\` pages`, sources)

  const sourceByPersona = new Map<string, Record<string, unknown>>()
  for (const row of sourceRows) {
    const held: Record<string, unknown> = {}
    for (const [pageKey, rowKey] of Object.entries(SOURCE_KEYS)) {
      const value = textOf(row[pageKey])
      if (value !== undefined) held[rowKey] = value
    }
    sourceByPersona.set(personaSlugIn(row), held)
  }

  const out: Record<string, unknown>[] = []
  for (const row of personaRows) {
    const id = textOf(row.id)
    const slug = textOf(row.slug)
    if (id === undefined || slug === undefined) continue
    const greenDayPoints = numberOf(row.greenDayPoints)
    const valueSlug = textOf(row.valueSlug)
    out.push({
      id,
      slug,
      title: slug,
      ...(valueSlug === undefined ? {} : { valueSlug }),
      ...(greenDayPoints === undefined ? {} : { greenDayPoints }),
      ...(sourceByPersona.get(slug) ?? {}),
    })
  }
  return out
}
