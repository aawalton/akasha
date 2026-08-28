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
 * A LEAF. No disk, no page index, no clock. The pages arrive as an argument, already read, and the
 * moment `now()` answers arrives on each page's values. `pages-system/store/` is what reads them.
 */

import {
  type Checked as CheckedFormula,
  checkFormula,
  type DeclaredType,
  type PageType,
  type Place,
  type Refused,
  runFormula,
  type Shape,
  type Values,
} from "../formula/formula.ts"

/** Where a refusal of this package's own points: a `where` is held whole, so at its start. */
const START: Place = { offset: 0, line: 1, column: 1 }

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
  /** The formula narrowing them, which answers a boolean. A query stating none asks for them all. */
  readonly where?: string
}

/** `a` or `an`, for a refusal that names a type. */
const an = (word: string): string =>
  ["a", "e", "i", "o", "u"].includes(word[0] ?? "") ? `an ${word}` : `a ${word}`

/** How the type a `where` answers is named in a refusal. */
const answering = (holds: DeclaredType | null): string => {
  if (holds === null) return "absent and nothing else"
  return holds.kind === "list" ? `a list of ${holds.of}` : an(holds.kind)
}

/** A query refused for what it asks of a page type, rather than for the text of its `where`. */
const refuseQuery = (message: string): Refused => ({
  ok: false,
  moment: "checking",
  message,
  at: START,
})

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

  /** The page type whose pages this asks about, carried through so a store can be asked for them. */
  readonly pageType: string

  readonly #test: CheckedFormula | null

  constructor(pageType: string, test: CheckedFormula | null) {
    this.pageType = pageType
    this.#test = test
  }

  /**
   * The pages among these the `where` holds of, in the order they arrived.
   *
   * A `where` ANSWERING ABSENT DOES NOT HOLD. A formula reaching a key the page holds nothing under
   * answers absent rather than false, and a page that cannot be tested is not a page the test
   * found. This is why a `where` may answer absent at all: refusing one that can would refuse
   * `{on-call}` on a page type where `on-call` is not required, which is most of them.
   */
  answer(pages: readonly Page[]): readonly Page[] {
    const test = this.#test
    if (test === null) return pages
    return pages.filter((page) => {
      const held = runFormula(test, page.values)
      return held.kind === "boolean" && held.boolean
    })
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

/** What a refusal says of a `where` naming keys no formula holds. */
const beyondSaid = (named: readonly string[], beyond: Readonly<Record<string, string>>): string =>
  [...named]
    .sort()
    .map((key) => `\`${key}\` is declared to hold \`${beyond[key]}\`, which no formula holds`)
    .join("; ")

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
 */
export const checkQuery = (query: Query, declared: Declared): Checked | Refused => {
  const where = query.where
  if (where === undefined) return new CheckedQuery(query.pageType, null)

  const checked = checkFormula(where, shapeOf(declared))
  if (!checked.ok) return checked

  const named = checked.reads.filter((key) => key in declared.beyond)
  if (named.length > 0) return refuseQuery(beyondSaid(named, declared.beyond))

  const holds = checked.type.holds
  if (holds === null || holds.kind !== BOOLEAN) {
    return refuseQuery(`a \`where\` answers a boolean, and this one answers ${answering(holds)}`)
  }

  return new CheckedQuery(query.pageType, checked)
}

/**
 * Work out a checked query over the pages it is handed. It answers those its `where` holds of, and
 * never fails.
 *
 * WHICH PAGES THESE ARE IS THE CALLER'S. A query names its page type and this does not enumerate,
 * so handing it the pages of another page type answers nonsense rather than a refusal. The pairing
 * is `pagesOf(checked.pageType)`.
 */
export const runQuery = (checked: Checked, pages: readonly Page[]): readonly Page[] =>
  checked.answer(pages)
