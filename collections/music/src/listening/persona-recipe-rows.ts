import { type Asked, askNamed } from "@shared/pages-query"
import { type QueryRow } from "@shared/pages-query/answer-schema"
import { askComposed } from "@shared/pages-query/ask"

const PERSONA_QUERY = "persona-all"
const POINTS_SOURCE_QUERY = "persona-points-source-all"

const SOURCE_KEYS = {
  kind: "pointsSourceKind",
  marker: "pointsSource",
  aggregate: "pointsSourceAggregate",
  "path-prefix": "pointsPathPrefix",
  "point-field": "pointsSourcePointField",
  "weight-field": "pointsSourceWeightField",
} as const

function text(values: Record<string, unknown>, key: string): string | undefined {
  const held = values[key]
  return typeof held === "string" && held.length > 0 ? held : undefined
}

function everyRowIn(named: string, asked: Asked): readonly QueryRow[] {
  if (!asked.ok) throw new Error(`\`${named}\` went unread: ${asked.why}`)
  const { n, rows } = asked.answer
  if (rows.length !== n) {
    throw new Error(
      `\`${named}\` answered with ${rows.length} of ${n} page(s), so nothing it fails to ` +
        `name can be told from what it never showed`
    )
  }
  return rows
}

async function valueIdBySlug(): Promise<ReadonlyMap<string, string>> {
  const asked = await askComposed({ "page-type": "value", keys: ["id", "title"] })
  if (!asked.ok) throw new Error(`valueIdBySlug: ${asked.why}`)
  const out = new Map<string, string>()
  for (const row of asked.answer.rows) {
    const id = typeof row.values.id === "string" ? row.values.id : null
    const title = typeof row.values.title === "string" ? row.values.title : null
    if (id === null || title === null) continue
    out.set(title.toLowerCase(), id)
  }
  return out
}

export async function personaRecipeRows(): Promise<
  readonly Readonly<Record<string, unknown>>[]
> {
  const [personas, sources, valueIds] = await Promise.all([
    askNamed(PERSONA_QUERY),
    askNamed(POINTS_SOURCE_QUERY),
    valueIdBySlug(),
  ])
  const personaRows = everyRowIn(PERSONA_QUERY, personas)
  const sourceRows = everyRowIn(POINTS_SOURCE_QUERY, sources)

  const sourceByPersona = new Map<string, Record<string, unknown>>()
  for (const row of sourceRows) {
    const persona = text(row.values, "domain-parents-slugs")
    if (persona === undefined) continue
    const held: Record<string, unknown> = {}
    for (const [fileKey, rowKey] of Object.entries(SOURCE_KEYS)) {
      const value = text(row.values, fileKey)
      if (value !== undefined) held[rowKey] = value
    }
    sourceByPersona.set(persona, held)
  }

  const out: Record<string, unknown>[] = []
  for (const row of personaRows) {
    const id = text(row.values, "id")
    const slug = text(row.values, "slug")
    if (id === undefined || slug === undefined) continue
    const greenDayPoints = text(row.values, "green-day-points")
    const valueSlug = text(row.values, "value-slug")
    out.push({
      id,
      slug,
      title: text(row.values, "title") ?? slug,
      ...(valueSlug === undefined ? {} : { value: valueIds.get(valueSlug) }),
      ...(greenDayPoints === undefined ? {} : { greenDayPoints: Number(greenDayPoints) }),
      ...(sourceByPersona.get(slug) ?? {}),
    })
  }
  return out
}
