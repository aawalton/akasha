import type { DeclaredType, Value } from "../formula/formula.ts"
import type { Declared, Page, Query } from "./query.ts"
import { answering } from "./refuse.ts"

export type Ordering = {
  readonly by: string
  readonly kind: DeclaredType["kind"]
  readonly descending: boolean
}

const ORDERED: readonly string[] = ["number", "instant", "date", "text"]

const rankOf = (value: Value | undefined, kind: string): number | string | null => {
  if (value === undefined || value.kind !== kind) return null
  switch (value.kind) {
    case "number":
      return value.number
    case "instant":
      return value.instant
    case "date":
      return value.date
    case "text":
      return value.text
    default:
      return null
  }
}

export const orderRefused = (query: Query, declared: Declared): string | null => {
  const by = query.sortBy
  if (by === undefined) {
    if (query.descending === undefined) return null
    return "a query stating `descending` states the key it orders by, and this one states no `sort-by`"
  }
  const beyond = declared.beyond[by]
  if (beyond !== undefined) {
    return `\`${by}\` is declared to hold \`${beyond}\`, which no order orders`
  }
  const property = declared.properties[by]
  if (property === undefined) return `no page type this asks about declares \`${by}\``
  if (!ORDERED.includes(property.type.kind)) {
    return `a query orders by a number, an instant, a date or a text, and \`${by}\` holds ${answering(property.type)}`
  }
  return null
}

export const orderingOf = (query: Query, declared: Declared): Ordering | null => {
  const by = query.sortBy
  if (by === undefined) return null
  const property = declared.properties[by]
  if (property === undefined) return null
  return { by, kind: property.type.kind, descending: query.descending === true }
}

export const ordered = (pages: readonly Page[], ordering: Ordering): readonly Page[] => {
  const holding: { page: Page; rank: number | string; at: number }[] = []
  const without: Page[] = []
  pages.forEach((page, at) => {
    const rank = rankOf(page.values.properties[ordering.by], ordering.kind)
    if (rank === null) without.push(page)
    else holding.push({ page, rank, at })
  })
  const way = ordering.descending ? -1 : 1
  holding.sort((a, b) => (a.rank === b.rank ? a.at - b.at : way * (a.rank < b.rank ? -1 : 1)))
  return [...holding.map((one) => one.page), ...without]
}
