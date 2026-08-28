import {
  type Checked as CheckedFormula,
  checkFormula,
  type DeclaredType,
  type PageType,
  type Refused,
  runFormula,
  type Shape,
  type Values,
} from "../formula/formula.ts"
import { type Extending, cycleAmong, familyOf } from "./expands.ts"
import { type Ordering, ordered, orderRefused, orderingOf } from "./order.ts"
import { type Declaring, keysRefused, narrowed } from "./keys.ts"
import type { How, Reduction } from "./reduce.ts"
import { answering, beyondSaid, limitRefused, reductionRefused, refuseQuery } from "./refuse.ts"

const BOOLEAN = "boolean"

export type Page = {
  readonly at: string
  readonly values: Values
}

export type Declared = {
  readonly properties: PageType
  readonly beyond: Readonly<Record<string, string>>
}

export type Query = {
  readonly pageType: string
  readonly expands?: boolean
  readonly keys?: readonly string[]
  readonly where?: string
  readonly sortBy?: string
  readonly descending?: boolean
  readonly limit?: number
  readonly function?: How
  readonly target?: string
}

class CheckedQuery {
  readonly ok: true = true

  readonly pageTypes: readonly string[]

  readonly #test: CheckedFormula | null

  readonly #keys: readonly string[] | null

  readonly #ordering: Ordering | null

  readonly #limit: number | null

  readonly reduction: Reduction | null

  constructor(
    pageTypes: readonly string[],
    test: CheckedFormula | null,
    keys: readonly string[] | null,
    reduction: Reduction | null,
    ordering: Ordering | null,
    limit: number | null
  ) {
    this.pageTypes = pageTypes
    this.#test = test
    this.#keys = keys
    this.reduction = reduction
    this.#ordering = ordering
    this.#limit = limit
  }

  answer(pages: readonly Page[]): readonly Page[] {
    const test = this.#test
    const found =
      test === null
        ? pages
        : pages.filter((page) => {
            const held = runFormula(test, page.values)
            return held.kind === "boolean" && held.boolean
          })
    const inOrder = this.#ordering === null ? found : ordered(found, this.#ordering)
    const limited = this.#limit === null ? inOrder : inOrder.slice(0, this.#limit)
    return narrowed(limited, this.#keys)
  }
}

export type Checked = CheckedQuery

const shapeOf = (declared: Declared): Shape => {
  const shape: Record<string, DeclaredType> = {}
  for (const [key, property] of Object.entries(declared.properties)) shape[key] = property.type
  for (const key of Object.keys(declared.beyond)) shape[key] = { kind: "text" }
  return shape
}

export const checkQuery = (
  query: Query,
  declared: Declared,
  extending?: Extending,
  declaring?: Declaring
): Checked | Refused => {
  let pageTypes: readonly string[] = [query.pageType]
  if (query.expands === true) {
    if (extending === undefined) {
      return refuseQuery(
        "a query that expands is worked out from what each page type extends, and none was handed in"
      )
    }
    const found = familyOf(query.pageType, extending)
    if ("ring" in found) return refuseQuery(cycleAmong(found.ring))
    pageTypes = found.family
  }

  const keys = query.keys ?? null
  if (keys !== null) {
    const refused = keysRefused(keys, pageTypes, declaring ?? new Map([[query.pageType, declared]]))
    if (refused !== null) return refuseQuery(refused)
  }

  const misordered = orderRefused(query, declared)
  if (misordered !== null) return refuseQuery(misordered)
  const ordering = orderingOf(query, declared)

  const overLimit = limitRefused(query)
  if (overLimit !== null) return refuseQuery(overLimit)
  const limit = query.limit ?? null

  const wrong = reductionRefused(query, declared)
  if (wrong !== null) return refuseQuery(wrong)
  const reduction: Reduction | null =
    query.function === undefined || query.target === undefined
      ? null
      : { how: query.function, target: query.target }

  const where = query.where
  if (where === undefined) {
    return new CheckedQuery(pageTypes, null, keys, reduction, ordering, limit)
  }

  const checked = checkFormula(where, shapeOf(declared))
  if (!checked.ok) return checked

  const named = checked.reads.filter((key) => key in declared.beyond)
  if (named.length > 0) return refuseQuery(beyondSaid(named, declared.beyond))

  const holds = checked.type.holds
  if (holds === null || holds.kind !== BOOLEAN) {
    return refuseQuery(`a \`where\` answers a boolean, and this one answers ${answering(holds)}`)
  }

  return new CheckedQuery(pageTypes, checked, keys, reduction, ordering, limit)
}

export const runQuery = (checked: Checked, pages: readonly Page[]): readonly Page[] =>
  checked.answer(pages)
