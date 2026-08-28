/**
 * The order a query answers its pages in.
 *
 * WHAT ORDERS A VALUE IS THE TYPE ITS PROPERTY DECLARES, never the value found on a page.
 * `pages/domain/page-query-language.domain.md:23` states it: "A page query compares a value by the
 * type its property declares." So the declared kind is settled once, at checking, and carried on the
 * `Ordering`; nothing here sniffs a value to decide what comparing it means. A page holding some
 * other kind under the key was read under another page type's declaration, and is treated as
 * holding nothing, exactly as `reduce.ts` treats a value that is not a number.
 *
 * ONLY FOUR TYPES ARE ORDERED, and the rest are refused at checking. `pages/list/formula-
 * operators.list.md:21` gives `<` for numbers alone, so no page writes what it means for one boolean
 * or one list to come before another. Ordering them would be inventing a meaning, and a query that
 * asked for an order it did not get answers pages in the order they happened to arrive — which
 * reads exactly like pages a query ordered.
 *
 * A PAGE HOLDING NOTHING UNDER THE KEY IS NOT ORDERED AGAINST ONE THAT DOES.
 * `pages/page-property-definition/page-query-test-before.page-property-definition.md:18` settles the
 * half that is written: "A page carrying no value at all falls on neither." Such pages stand after
 * every page that holds a value, in both directions, keeping the order they arrived in. Where they
 * stand is not written anywhere; it is marked `absent-orders-last` in the case corpus.
 *
 * TIES KEEP THE ORDER THEY ARRIVED IN, and this says so with the arrival index rather than resting
 * on the sort being stable. A caller reading the first page of an order with ties gets the same page
 * every time.
 *
 * PURE. The pages arrive already read, and no page, file or clock is reached here.
 */

import type { DeclaredType, Value } from "../formula/formula.ts"
import type { Declared, Page, Query } from "./query.ts"
import { answering } from "./refuse.ts"

/** What a query orders by, settled at checking. */
export type Ordering = {
  /** The key ordered by, held at checking to a key declared one of the ordered types. */
  readonly by: string
  /** What that key is declared to hold. A page holding another kind under it holds nothing. */
  readonly kind: DeclaredType["kind"]
  /** Whether the order runs from the highest value down. */
  readonly descending: boolean
}

/** The declared types a page writes an order for. */
const ORDERED: readonly string[] = ["number", "instant", "date", "text"]

/**
 * What one page sorts on, or null where it sorts on nothing.
 *
 * A DATE AND A TEXT BOTH RANK AS TEXT, and a date's code-point order is its order in time because
 * `pages-system/formula/formula.ts:24-30` gives a date one spelling and no other.
 */
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

/**
 * Why a query's order cannot be worked out, or nothing where it can.
 *
 * `descending` WITHOUT `sort-by` IS REFUSED, as a `target` without a `function` is. Either alone is
 * a query whose writer meant an order and did not get one, and answering in arrival order reads
 * exactly like a query that asked for no order at all.
 *
 * THE KEY IS HELD TO THE DECLARATION OF THE PAGE TYPE NAMED, as the `where` and the `target` are.
 */
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

/** What a checked query's order is, or null where it states none. */
export const orderingOf = (query: Query, declared: Declared): Ordering | null => {
  const by = query.sortBy
  if (by === undefined) return null
  const property = declared.properties[by]
  if (property === undefined) return null
  return { by, kind: property.type.kind, descending: query.descending === true }
}

/** These pages in the order the query asked for, those holding nothing under the key last. */
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
