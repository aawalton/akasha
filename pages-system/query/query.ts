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

/**
 * What each page type extends, by its own slug: the whole set, as a store read it.
 *
 * A PAGE TYPE EXTENDING NOTHING IS NOT A KEY HERE. `extends-slug: none` and no `extends-slug` at all
 * say one thing — nothing above — and what a query wants is the other direction, so a key standing
 * with nothing under it would only ever be stepped over.
 *
 * THE WHOLE SET RATHER THAN ONE PAGE TYPE'S KIN. Which page types stand beneath another is the
 * answer being worked out from this, so a store handing that in already would have had to walk the
 * tree itself, and would have had to rule on a ring in it, which is a refusal of a query.
 */
export type Extending = ReadonlyMap<string, string>

/** What is asked. */
export type Query = {
  /** The page type whose pages this asks about. */
  readonly pageType: string
  /**
   * Whether the page types beneath that one arrive with it: every page type whose `extends-slug`
   * reaches it, however far down. A query stating nothing asks about the one page type it names.
   */
  readonly expands?: boolean
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

  /**
   * Every page type whose pages this asks about, the one the query named first: that one alone, or
   * that one and every page type beneath it where the query expands. A store is asked for each.
   *
   * THE ONE NAMED IS NOT ALSO CARRIED ALONE. A caller holding both would reach for the singular and
   * answer a query that expands with the pages of its head alone, which no type would catch.
   */
  readonly pageTypes: readonly string[]

  readonly #test: CheckedFormula | null

  constructor(pageTypes: readonly string[], test: CheckedFormula | null) {
    this.pageTypes = pageTypes
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

/** What a refusal says of a ring among page types, in the terms those page types were written in. */
const cycleAmong = (ring: readonly string[]): string =>
  `a cycle among the page types ${ring.map((slug) => `\`${slug}\``).join(", ")}`

/**
 * Which page types extend each one, worked out once rather than scanned again at every step down.
 *
 * SORTED, so that one page type's family reads the same twice. What is handed in was gathered by a
 * walk of a disk, and a disk's order is its own.
 */
const beneath = (extending: Extending): ReadonlyMap<string, readonly string[]> => {
  const under = new Map<string, string[]>()
  for (const [slug, over] of extending) {
    const held = under.get(over)
    if (held === undefined) under.set(over, [slug])
    else held.push(slug)
  }
  for (const held of under.values()) held.sort()
  return under
}

/** A page type and everything beneath it, or the ring standing in the way of saying what that is. */
type Family = { readonly family: readonly string[] } | { readonly ring: readonly string[] }

/**
 * The page type named and every page type beneath it, the named one first.
 *
 * A RING IS ANSWERED RATHER THAN WALKED. `extends-slug` should stand a tree and nothing here can
 * make it one, so a page type met twice on one way down is handed back as the ring it closes, as a
 * page type's formulas hand back the ring they run round. Walking it would hang, and stopping at
 * the repeat would answer a family that leaves nobody out and means nothing.
 *
 * A RING IS ONLY EVER MET FROM INSIDE IT. A page type extends at most one page type, so nothing
 * outside a ring stands beneath any member of one: a query expanding a page type that stands in no
 * ring cannot reach one, and is not refused for a ring elsewhere in the corpus. That is the same
 * scope a page type's own formulas are held to, where the cycle refused is the one it runs round.
 *
 * A PAGE TYPE BENEATH DECLARING NOTHING NEW IS STILL BENEATH. Nothing here reads a declaration: one
 * page type extending another and adding not one key is a kind of it, and its pages are asked for.
 */
const familyOf = (pageType: string, extending: Extending): Family => {
  const under = beneath(extending)
  const family: string[] = []
  const open: string[] = []
  const walk = (slug: string): readonly string[] | null => {
    const standing = open.indexOf(slug)
    if (standing !== -1) return open.slice(standing)
    open.push(slug)
    family.push(slug)
    for (const one of under.get(slug) ?? []) {
      const ring = walk(one)
      if (ring !== null) return ring
    }
    open.pop()
    return null
  }
  const ring = walk(pageType)
  return ring === null ? { family } : { ring }
}

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
 *
 * WHAT IS ASKED ABOUT IS SETTLED BEFORE WHAT NARROWS IT. A query expanding into a ring of page types
 * has no set of pages to be about at all, so it is refused before its `where` is read; a fault in
 * the `where` of a query whose subject is undefined would be reported about nothing.
 *
 * ONE DECLARATION COVERS THE WHOLE FAMILY. The `where` is held to what the page type NAMED declares,
 * which is what every page type beneath it inherits, and the pairing under `runQuery` reads every
 * page of the family under that same declaration. A page type beneath restating a key under another
 * type is a fault of that page type, found where page types are checked, rather than a second
 * meaning a query quietly takes on.
 */
export const checkQuery = (
  query: Query,
  declared: Declared,
  extending?: Extending
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

  const where = query.where
  if (where === undefined) return new CheckedQuery(pageTypes, null)

  const checked = checkFormula(where, shapeOf(declared))
  if (!checked.ok) return checked

  const named = checked.reads.filter((key) => key in declared.beyond)
  if (named.length > 0) return refuseQuery(beyondSaid(named, declared.beyond))

  const holds = checked.type.holds
  if (holds === null || holds.kind !== BOOLEAN) {
    return refuseQuery(`a \`where\` answers a boolean, and this one answers ${answering(holds)}`)
  }

  return new CheckedQuery(pageTypes, checked)
}

/**
 * Work out a checked query over the pages it is handed. It answers those its `where` holds of, and
 * never fails.
 *
 * WHICH PAGES THESE ARE IS THE CALLER'S. A query names its page types and this does not enumerate,
 * so handing it the pages of another page type answers nonsense rather than a refusal. The pairing
 * is `checked.pageTypes.flatMap((one) => pagesOf(root, one))`, each page read under the declaration
 * the query was checked against.
 */
export const runQuery = (checked: Checked, pages: readonly Page[]): readonly Page[] =>
  checked.answer(pages)
