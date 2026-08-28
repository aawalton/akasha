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
 * Where a page type's pages stand as rows: which page types hold them, and under which key.
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
 */
export const holdingsOf = (root: string, pageType: string): Held => {
  const found = pagesUnder(root, new Set([PROPERTY]))
  const holdings: Holding[] = []
  const beyond: Record<string, string> = {}
  for (const one of found.get(PROPERTY) ?? []) {
    const stated = statedAt(root, one)
    if (typeof stated === "string") continue
    const rows = textIn(stated, ROWS)
    if (rows === null || textIn(stated, TARGET) !== pageType) continue
    const on = textIn(stated, DEFINED_ON)
    const key = textIn(stated, KEY)
    if (on === null || !on.startsWith(ON) || key === null) continue
    if (rows !== JSONL) {
      beyond[textIn(stated, SLUG) ?? one] = rows
      continue
    }
    holdings.push({ on: on.slice(ON.length), key })
  }
  holdings.sort((one, other) => one.on.localeCompare(other.on) || one.key.localeCompare(other.key))
  return { holdings, beyond }
}

/**
 * Where every page of a page type stands, in whatever order they were found.
 *
 * AN ADDRESS IS THIS PACKAGE'S TO READ. A page held in a file is addressed by the repository it
 * stands in and its path below that repository's root; a page held as a row is addressed by the
 * sidecar holding it and its name within that, and only `pageAt` knows the difference.
 *
 * ONE CALL READS ONE REPOSITORY, and a caller reading across every repository makes one call each.
 *
 * THE PAGE TYPE NEED NOT STAND. A slug naming no page type answers no pages, the same as one whose
 * pages are all gone, because what makes a file a page of this type is its own name and nothing
 * asks a page type. Whether the page type stands is `declarationOf`'s answer.
 *
 * A PAGE TYPE WHOSE PAGES ARE ROWS ANSWERS NONE OF THEM YET. Nothing here reads a sidecar, so a
 * page type stating `files: none` answers empty rather than refusing — which is the one place a
 * caller can still tell, and the reason the row half is worth adding before a caller relies on it.
 *
 * NO ORDER IS PROMISED. A caller wanting one sorts, and a query wanting one has nowhere to say so
 * yet.
 */
export const pagesOf = (repo: Repo, pageType: string): readonly string[] =>
  (pagesUnder(repo.root, new Set([pageType])).get(pageType) ?? []).map((at) =>
    addressIn(repo.repo, at)
  )

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
