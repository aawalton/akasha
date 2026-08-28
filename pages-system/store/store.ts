/**
 * The pages of a page type, and what each one holds.
 *
 * This is where the pages system meets a disk. Everything else under `pages-system/` is pure and
 * takes its values as arguments; this reads them. The split is the point: `pageTypeOf`, `nameOf`,
 * `checkFormula` and `checkQuery` can each be run over the whole corpus in a script because none of
 * them can reach a file, and they stay that way by this package existing.
 *
 * THREE OF THE FIVE QUESTIONS ARE ANSWERED HERE. Where a page type's pages stand, for a page type
 * whose pages are rows rather than files. Which pages a page type has. What one of those pages
 * holds. The other two — what a page type declares, and what each page type extends — are
 * `declared.ts`, which reads page types and property definitions rather than pages. A resolver is
 * those five and the pure halves put together, and the putting together is the caller's, so that no
 * order of calls is baked in here.
 *
 * WHERE A PAGE STANDS IS AN ADDRESS THIS PACKAGE ISSUES AND READS BACK — `address.ts` spells one,
 * naming the repository — never a path a caller may join to a root. A page is a file and its rows are a sidecar beside it, so a page of
 * a page type stating `files: none` — `session-tracking` is one — stands as a line in another page's
 * sidecar and has no file of its own to be named by. Rows enter here and nowhere else: `pagesOf`
 * learns to answer a holder's rows, `pageAt` learns to read one back, and no caller can tell. A
 * caller that reads a file at an address is a caller rows would break.
 *
 * NO CLOCK. The moment a page's formulas are worked out arrives as an argument, exactly as it does
 * for a naming, so that two pages read in one pass are read at one moment.
 *
 * NOTHING IS HELD BETWEEN CALLS. Each call walks and reads afresh, which is right while a walk of
 * this repository costs under a tenth of a second and wrong as soon as it does not.
 */

import type { Value, Values } from "../formula/formula.ts"
import type { Declared, Page } from "../query/query.ts"
import { type Repo, addressIn, notIn, pathOf } from "./address.ts"
import { DEFINED_ON, KEY, ON, PROPERTY, SLUG, textIn } from "./declared.ts"
import { pagesUnder, statedAt } from "./files.ts"
import { valuedAs } from "./held.ts"

/** A page that could not be read, and why. */
export type Unread = {
  /** Where the page stands, as `pagesOf` answered it. */
  readonly at: string
  /** What was wrong, in the terms a reader of the file would put it. */
  readonly unread: string
}

/** What a property definition states when the key it declares holds a page's rows. */
const ROWS = "rows"

/** The one way rows are written down, a row being a line of JSON. */
const JSONL = "jsonl"

/** What a property definition states the page type its rows are pages of. */
const TARGET = "target-slug"

/** One place a page type's pages stand as rows. */
export type Holding = {
  /** The page type whose pages hold them. */
  readonly on: string
  /** The key those pages hold them under, which is what names the sidecar. */
  readonly key: string
}

/** Where a page type's pages stand, for a page type whose pages are rows. */
export type Held = {
  /** Every place its pages stand. A page type whose pages are files has none. */
  readonly holdings: readonly Holding[]
  /** Every property holding rows in a way this store cannot read, by the spelling it states. */
  readonly beyond: Readonly<Record<string, string>>
}

/**
 * Where each of the page types named has its pages standing as rows: which page types hold them,
 * and under which key.
 *
 * THE WHOLE SET, ONE READ. Every property definition under the root is read once and each answer
 * projected out of that one read. Asking one page type at a time reads all of them again for every
 * one asked, which is most of what a pass over a family of page types costs.
 *
 * EVERY PAGE TYPE ASKED FOR IS ANSWERED, holding no holding where none stands. A page type whose
 * pages are files is held by nothing, and that is a true empty rather than a failure, so it stands
 * in the answer holding an empty list. This is the other way round from `declarationsFor`, where
 * being absent is how a page type that does not stand is reported. Whether a page type stands is
 * not asked here, as it is not in `pagesFor`, so a slug naming no page type is held by nothing.
 *
 * A PAGE TYPE MAY BE HELD IN MORE THAN ONE PLACE. Thirteen page types hold `reference` rows under
 * `references`, so this answers a list rather than one holding; a reader taking the first would
 * answer a thirteenth of that page type's pages and say nothing about the rest.
 *
 * A ROWS SPELLING THIS STORE CANNOT READ IS CARRIED RATHER THAN DROPPED. `rows: jsonl` is the only
 * spelling written down today, and a property stating another names pages that stand somewhere this
 * cannot reach. Reading it as `jsonl` would answer no rows from a file that is not there, which is
 * the same answer as a page holding none; carrying it under `beyond` is what lets a caller tell
 * those apart and refuse rather than answer empty.
 *
 * THE HOLDER IS ANSWERED AS DECLARED, NOT EXPANDED. `log-line` is declared as the rows of `log-day`,
 * and `seat-log-day` extends `log-day` and holds them too. Which page types stand beneath a holder
 * is read off `extendingIn`, and putting the two together is the caller's, as it is for everything
 * else here.
 *
 * WHAT IS ASKED FOR IS READ FOR EXACTLY ONCE. A generator satisfies `Iterable` and is spent after
 * one pass, so walking it a second time would find nothing and answer every page type asked about
 * as held by nothing — a silent empty answer where a refusal belongs. The slugs are collected
 * before the read, and everything after it works from what was collected.
 *
 * NOTHING ASKED FOR IS NOT READ FOR. A call naming no page type answers nothing without reading,
 * the walk and the read being the whole cost here and there being nothing to fill from them.
 */
export const holdingsFor = (root: string, pageTypes: Iterable<string>): Map<string, Held> => {
  const filling = new Map<string, { holdings: Holding[]; beyond: Record<string, string> }>()
  for (const one of pageTypes) {
    if (!filling.has(one)) filling.set(one, { holdings: [], beyond: {} })
  }
  const held = new Map<string, Held>()
  if (filling.size === 0) return held
  const found = pagesUnder(root, new Set([PROPERTY]))
  for (const one of found.get(PROPERTY) ?? []) {
    const stated = statedAt(root, one)
    if (typeof stated === "string") continue
    const rows = textIn(stated, ROWS)
    if (rows === null) continue
    const target = textIn(stated, TARGET)
    const mine = target === null ? undefined : filling.get(target)
    if (mine === undefined) continue
    const on = textIn(stated, DEFINED_ON)
    const key = textIn(stated, KEY)
    if (on === null || !on.startsWith(ON) || key === null) continue
    if (rows !== JSONL) {
      mine.beyond[textIn(stated, SLUG) ?? one] = rows
      continue
    }
    mine.holdings.push({ on: on.slice(ON.length), key })
  }
  for (const [pageType, mine] of filling) {
    mine.holdings.sort((one, other) => one.on.localeCompare(other.on) || one.key.localeCompare(other.key))
    held.set(pageType, mine)
  }
  return held
}

/**
 * Where a page type's pages stand as rows: which page types hold them, and under which key.
 *
 * ONE PAGE TYPE COSTS THE WHOLE READ, this being `holdingsFor` asked for one, so that what the
 * singular answers cannot drift from what the plural answers. A caller wanting several asks the
 * plural once rather than this once each.
 */
export const holdingsOf = (root: string, pageType: string): Held =>
  holdingsFor(root, [pageType]).get(pageType) ?? { holdings: [], beyond: {} }

/**
 * Where every page of each page type named stands, by page type, in whatever order they were found.
 *
 * THE WHOLE SET, ONE WALK. The tree is walked once and every page type asked for is filled out of
 * that one walk. Asking one page type at a time walks the whole tree again for each, and that walk
 * costs the same whether the page type has a thousand pages or none, which is most of what a pass
 * over many page types costs.
 *
 * AN ADDRESS IS THIS PACKAGE'S TO READ. A page held in a file is addressed by the repository it
 * stands in and its path below that repository's root; a page held as a row is addressed by the
 * sidecar holding it and its name within that, and only `pageAt` knows the difference.
 *
 * ONE CALL READS ONE REPOSITORY, and a caller reading across every repository makes one call each.
 *
 * EVERY PAGE TYPE ASKED FOR IS ANSWERED, holding nothing where no page of it stands. A page type
 * with no pages is a true empty rather than a failure, so it stands in the answer holding an empty
 * list. This is the other way round from `declarationsFor`, where being absent is how a page type
 * that does not stand is reported.
 *
 * WHETHER THE PAGE TYPE STANDS IS NOT ASKED HERE, so a slug naming no page type answers no pages,
 * the same as one whose pages are all gone. What makes a file a page of a type is its own name; and
 * a page type is declared in akasha while this reads whichever repository it is handed, so standing
 * could not be told from this root anyway. Whether a page type stands is `declarationOf`'s answer.
 *
 * A PAGE TYPE WHOSE PAGES ARE ROWS ANSWERS NONE OF THEM YET. Nothing here reads a sidecar, so a
 * page type stating `files: none` answers empty rather than refusing — which is the one place a
 * caller can still tell, and the reason the row half is worth adding before a caller relies on it.
 *
 * WHAT IS ASKED FOR IS WALKED EXACTLY ONCE. A generator satisfies `Iterable` and is spent after one
 * pass, so walking it a second time would find nothing and answer no pages for every page type
 * asked about — a silent empty answer where a refusal belongs. The slugs are collected in that one
 * walk, and everything after it works from what was collected.
 *
 * NOTHING ASKED FOR IS NOT WALKED FOR. A call naming no page type answers nothing without walking,
 * a walk being the whole cost here and there being nothing to fill from it.
 *
 * NO ORDER IS PROMISED. A caller wanting one sorts, and a query wanting one has nowhere to say so
 * yet.
 */
export const pagesFor = (
  repo: Repo,
  pageTypes: Iterable<string>
): Map<string, readonly string[]> => {
  const asked = new Set<string>()
  for (const one of pageTypes) asked.add(one)
  const pages = new Map<string, readonly string[]>()
  if (asked.size === 0) return pages
  const found = pagesUnder(repo.root, asked)
  for (const one of asked) {
    pages.set(
      one,
      (found.get(one) ?? []).map((at) => addressIn(repo.repo, at))
    )
  }
  return pages
}

/**
 * Where every page of a page type stands, in whatever order they were found.
 *
 * ONE PAGE TYPE COSTS THE WHOLE WALK, this being `pagesFor` asked for one, so that what the singular
 * answers cannot drift from what the plural answers. A caller wanting several asks the plural once
 * rather than this once each.
 */
export const pagesOf = (repo: Repo, pageType: string): readonly string[] =>
  pagesFor(repo, [pageType]).get(pageType) ?? []

/**
 * What one page holds, under the types its page type declares, or why it could not be read.
 *
 * EVERY DECLARED KEY IS ANSWERED, including the ones the page states nothing under, which answer
 * absent. A formula reads a key it is not handed as absent anyway, so this changes no answer; it
 * makes what the page holds a picture of what its page type declares rather than of what happened
 * to be written down.
 *
 * A KEY BEYOND THE LANGUAGE IS NOT ANSWERED. There is no value to answer it with, which is what
 * `beyond` means, and a query naming one never got past its check.
 *
 * WHAT A PAGE IN A FILE STATES IS ITS FRONTMATTER, and every address is one of those today. What a
 * page states in a sidecar beside it — the rows under a key declared `pages`, and the values under
 * a key marked `uncommitted` — is stated as truly and is not read here, so such a key answers
 * absent.
 *
 * AN ADDRESS OF ANOTHER REPOSITORY IS UNREAD RATHER THAN TAKEN AGAINST THIS ROOT, which would
 * answer whatever stands at that path here for an address this repository never issued.
 */
export const pageAt = (
  repo: Repo,
  at: string,
  declared: Declared,
  now: number
): Page | Unread => {
  const path = pathOf(repo, at)
  if (path === null) return { at, unread: notIn(repo.repo) }
  const stated = statedAt(repo.root, path)
  if (typeof stated === "string") return { at, unread: stated }
  const properties: Record<string, Value> = {}
  for (const [key, property] of Object.entries(declared.properties)) {
    properties[key] = valuedAs(stated[key], property.type)
  }
  return { at, values: { now, properties } satisfies Values }
}
