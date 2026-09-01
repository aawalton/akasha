import type { Asked, ComposedQuery, QueryRow } from "@akasha/pages-query/ask"
import { camelizeKey, kebabizeKey } from "../../../tools/lib/tracking/keys.ts"

// A page moving into the store has its keys camelized on the way in, so the store answers
// `valueSlug` where the page type declares `value-slug`. Everything asking it still spells the
// declared key, so the spelling is put into the store's terms on the way out and both spellings
// are answered on the way back. A reader spelling the store's key already is left as it stands.
export function storeSpelled(query: ComposedQuery): ComposedQuery {
  const held: Record<string, unknown> = { ...query }
  const keys = query.keys
  if (keys !== undefined) held.keys = keys.map(camelizeKey)
  const countBy = query["count-by"]
  if (countBy !== undefined) held["count-by"] = countBy.map(camelizeKey)
  const sortBy = query["sort-by"]
  if (sortBy !== undefined) held["sort-by"] = camelizeKey(sortBy)
  const target = query.target
  if (target !== undefined) held.target = camelizeKey(target)
  const where = query.where
  if (where !== undefined) {
    held.where = Object.fromEntries(
      Object.entries(where).map(([key, test]) => [camelizeKey(key), test])
    )
  }
  return held as ComposedQuery
}

export function bothSpellings(values: Record<string, unknown>): Record<string, unknown> {
  const held: Record<string, unknown> = { ...values }
  for (const [key, value] of Object.entries(values)) {
    const kebab = kebabizeKey(key)
    if (kebab !== key && !(kebab in held)) held[kebab] = value
  }
  return held
}

// The store leaves out a key it has no column for and answers null for one it has, so a key absent
// from every row of a non-empty answer is a key it could not answer rather than one standing empty.
export function unfoundIn(query: ComposedQuery, rows: readonly QueryRow[]): readonly string[] {
  const keys = query.keys
  if (keys === undefined || rows.length === 0) return []
  return [...keys].filter((key) => !rows.some((row) => camelizeKey(key) in row.values)).sort()
}

export async function askedAsSpelled(
  query: ComposedQuery,
  ask: (asked: ComposedQuery) => Promise<Asked>
): Promise<Asked> {
  const asked = await ask(storeSpelled(query))
  if (!asked.ok) return asked
  const rows = asked.answer.rows.map((row) => ({ ...row, values: bothSpellings(row.values) }))
  return { ok: true, answer: { ...asked.answer, rows, unfound: unfoundIn(query, rows) } }
}
