import type {
  Asked,
  ComposedQuery,
  QueryRow,
} from "../store-page-asking/store-page-asking.module.code.ts"

function camelizeKey(key: string): string {
  const segments = key.split(/[^A-Za-z0-9]+/).filter((one) => one.length > 0)
  const [first, ...rest] = segments
  if (first === undefined) return ""
  const head = first.charAt(0).toLowerCase() + first.slice(1)
  return head + rest.map((one) => one.charAt(0).toUpperCase() + one.slice(1)).join("")
}

function kebabizeKey(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}

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
