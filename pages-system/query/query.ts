/**
 * The query language: what a query may ask of a page type's pages.
 *
 * A query names a page type and, where it narrows, states a `where`. A `where` is a formula, and
 * the formula language settles the whole of what it may say. This package adds no comparator, no
 * operator and no second way to spell a test, so a query's meaning rests on what a page type
 * declares rather than on what its pages happen to hold. What a formula means is written in
 * `pages/domain/formula-language.domain.md`, never here.
 *
 * THERE ARE TWO MOMENTS, as there are for a formula and for a naming. `checkQuery` holds a query to
 * one page type's declared shape, once. `runQuery` answers which pages a checked query holds of.
 * Only a checked query can be run: the class behind `Checked` is never exported and holds its test
 * under a private name, so nothing outside this file can make one, and no caller can run a query
 * nothing checked.
 *
 * WHICH KEYS IT ANSWERS WITH IS SETTLED AT CHECKING TOO, and `keys.ts` settles it. A query over an
 * expanded set asks one set of keys of page types that declare different ones, so what happens where
 * a page type does not declare a key asked for is a rule rather than an accident.
 *
 * WHICH PAGE TYPES ARE ASKED ABOUT IS SETTLED AT CHECKING TOO. A query names one page type and,
 * where it expands, means that one together with every page type beneath it along `extends-slug`.
 * Which page types those are is a fact about page types rather than about pages, so it is worked out
 * once, against what a store read, rather than re-walked at each page.
 *
 * A LEAF. No disk, no page index, no clock. The pages arrive as an argument, already read, and the
 * moment `now()` answers arrives on each page's values. `pages-system/store/` is what reads them.
 */

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

/** What a `where` must answer. A query narrows by a test, and a test is a boolean. */
const BOOLEAN = "boolean"

/** One page, as a query sees it: where it stands, and what it holds. */
export type Page = {
  /** Where the page is, in whatever terms the store that read it answers. */
  readonly at: string
  /** What the page holds under each key, and the moment its formulas are worked out. */
  readonly values: Values
}

/**
 * What a page type declares, as a query sees it.
 *
 * TWO SETS RATHER THAN ONE, because a page type declares keys of both sorts and a reader naming
 * either has asked a fair question. `properties` is every key the formula language has a type for.
 * `beyond` is every key it has none for — a `json`, a `map`, a page's rows — held under the type
 * the page type states, so that a `where` naming one is refused saying what it holds rather than
 * refused as undeclared, which would be a lie, or matched against nothing, which would be silent.
 */
export type Declared = {
  /** Every key a `where` may name, what each holds, and the formula filling it where computed. */
  readonly properties: PageType
  /** Every key declared to hold what no formula holds, and the type the page type states for it. */
  readonly beyond: Readonly<Record<string, string>>
}

/** What is asked. */
export type Query = {
  /** The page type whose pages this asks about. */
  readonly pageType: string
  /**
   * Whether the page types beneath that one arrive with it: every page type whose `extends-slug`
   * reaches it, however far down. A query stating nothing asks about the one page type it names.
   */
  readonly expands?: boolean
  /**
   * The keys the pages it answers hold, and no others. A query stating none answers every key the
   * page type it names declares, which every page type beneath it inherits.
   */
  readonly keys?: readonly string[]
  /** The formula narrowing them, which answers a boolean. A query stating none asks for them all. */
  readonly where?: string
  /**
   * The key its answer is ordered by, declared a number, an instant, a date or a text. A query
   * stating none answers its pages in the order they arrived.
   */
  readonly sortBy?: string
  /** Whether that order runs from the highest value down. Stated only with a `sortBy`. */
  readonly descending?: boolean
  /**
   * How many pages it answers with, a whole number and never fewer than none. A query stating none
   * answers every page its `where` held of.
   */
  readonly limit?: number
  /** How the key it targets is reduced. A query stating this states a `target` too. */
  readonly function?: How
  /** The key reduced, declared a number. Stated only with a `function`. */
  readonly target?: string
}

/**
 * A query that has passed its check.
 *
 * Held as a class so that `runQuery` can only be reached with something `checkQuery` made. The
 * running is a method rather than a getter over the test, which keeps the checked formula inside
 * this file.
 */
class CheckedQuery {
  /** What tells a checked query from a refusal, as it does for a checked formula. */
  readonly ok: true = true

  /**
   * Every page type whose pages this asks about, the one the query named first: that one alone, or
   * that one and every page type beneath it where the query expands. A store is asked for each.
   *
   * THE ONE NAMED IS NOT ALSO CARRIED ALONE. A caller holding both would reach for the singular and
   * answer a query that expands with the pages of its head alone, which no type would catch.
   */
  readonly pageTypes: readonly string[]

  readonly #test: CheckedFormula | null

  readonly #keys: readonly string[] | null

  readonly #ordering: Ordering | null

  readonly #limit: number | null

  /**
   * What this query reduces, or null where it answers pages rather than a value. CARRIED IN THE OPEN
   * so a caller can tell whether asking this query for a value is a question it answers at all.
   */
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

  /**
   * The pages among these the `where` holds of, in the order the query asks for, or in the order
   * they arrived where it asks for none.
   *
   * A `where` ANSWERING ABSENT DOES NOT HOLD. A formula reaching a key the page holds nothing under
   * answers absent rather than false, and a page that cannot be tested is not a page the test
   * found. This is why a `where` may answer absent at all: refusing one that can would refuse
   * `{on-call}` on a page type where `on-call` is not required, which is most of them.
   *
   * NARROWING TO THE KEYS ASKED FOR HAPPENS HERE rather than in `runQuery`, so a caller holding a
   * checked query cannot reach the pages whole by calling this instead.
   */
  answer(pages: readonly Page[]): readonly Page[] {
    const test = this.#test
    const found =
      test === null
        ? pages
        : pages.filter((page) => {
            const held = runFormula(test, page.values)
            return held.kind === "boolean" && held.boolean
          })
    const held = narrowed(found, this.#keys)
    const inOrder = this.#ordering === null ? held : ordered(held, this.#ordering)
    return this.#limit === null ? inOrder : inOrder.slice(0, this.#limit)
  }
}

/** A query that has passed its check, which is the only thing that can be run. */
export type Checked = CheckedQuery

/** The keys a `where` may name and what each holds: every declared property, and every key beyond. */
const shapeOf = (declared: Declared): Shape => {
  const shape: Record<string, DeclaredType> = {}
  for (const [key, property] of Object.entries(declared.properties)) shape[key] = property.type
  for (const key of Object.keys(declared.beyond)) shape[key] = { kind: "text" }
  return shape
}

/**
 * Check a query against what its page type declares.
 *
 * THE `where` IS CHECKED BY `checkFormula`, so a `where` naming a key the page type does not
 * declare is refused where it stands, in the terms it was written in, and so is one whose types do
 * not meet. Nothing here sniffs a value to decide what a test means.
 *
 * A `where` IS HELD TO ANSWERING A BOOLEAN, exactly as `checkPageType` holds a formula to the type
 * its property declares. One answering a text or a number is a test that never ran, and a query
 * that quietly matched everything or nothing is the fault this refusal exists to stop.
 *
 * A KEY BEYOND THE LANGUAGE IS REFUSED SAYING SO. It is put into the shape as text first, so that
 * the fault reported is the one the reader can act on rather than `declares no key`; where such a
 * key is used in a way even text cannot bear, the earlier refusal about types is the one that
 * comes back, which is also true.
 *
 * THE PAGE TYPE'S OWN EXISTENCE IS NOT JUDGED HERE. Whether a page type of that slug stands, and
 * what it declares, is an answer off disk; this is handed the answer.
 *
 * WHAT IS ASKED ABOUT IS SETTLED BEFORE WHAT NARROWS IT. A query expanding into a ring of page types
 * has no set of pages to be about at all, so it is refused before its `where` is read; a fault in
 * the `where` of a query whose subject is undefined would be reported about nothing.
 *
 * ONE DECLARATION COVERS THE `where`. It is held to what the page type NAMED declares, which is what
 * every page type beneath it inherits. A page type beneath restating a key under another type is a
 * fault of that page type, found where page types are checked, rather than a second meaning a query
 * quietly takes on.
 *
 * THE KEYS ARE NOT HELD TO ONE DECLARATION, unlike the `where`. Which page types beneath the one
 * named actually declare a key added further down is what `declaring` answers, and it is what a
 * query asking for a subset of keys across an expanded set is refused against. A query naming one
 * page type needs none: what that page type declares is already in hand.
 */
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

/**
 * Work out a checked query over the pages it is handed. It answers those its `where` holds of, and
 * never fails.
 *
 * THE PAGES IT ANSWERS HOLD THE KEYS THE QUERY ASKED FOR AND NO OTHERS, and every one of those,
 * absent where the page's page type does not declare it. A query asking for none answers the pages
 * as they were read.
 *
 * WHICH PAGES THESE ARE IS THE CALLER'S. A query names its page types and this does not enumerate,
 * so handing it the pages of another page type answers nonsense rather than a refusal. The pairing
 * is `checked.pageTypes.flatMap((one) => pagesOf(repo, one))`, each page read under what THAT page
 * type declares — the set `checkQuery` was handed as `declaring`.
 *
 * READING A FAMILY UNDER THE HEAD'S DECLARATION ANSWERS ABSENT UNDER EVERY KEY A PAGE TYPE BENEATH
 * ADDS. A page type inherits every key its parent declares and may add more, so the head's
 * declaration is the keys the whole family shares rather than the keys any of it holds, and a page
 * read under it holds nothing under the keys its own page type added.
 */
export const runQuery = (checked: Checked, pages: readonly Page[]): readonly Page[] =>
  checked.answer(pages)
