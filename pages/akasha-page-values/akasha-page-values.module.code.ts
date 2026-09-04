/**
 * The values an akasha page declares, in the shape the query engine already reads a markdown page in.
 *
 * A page under `akasha/` is a TypeScript file exporting one object literal. A page under `pages/` is
 * markdown with yaml frontmatter. Both are pages of the same page type, and one population that has
 * split in two is still one population: a reader that indexes half of it answers that the other half
 * is not there, which reads as a day with no sessions rather than as a day it cannot see.
 *
 * So nothing here is a second reader. `valueAt` is akasha's own page reader and it is what loads the
 * body; `carried` is the coercion the jsonl rows beside a page already go through; `kebabizeKey` is
 * the spelling the migration already settled on. What this adds is the join: an akasha page's keys
 * are camel because a TypeScript object states them camel, and every key downstream of here — a
 * `where` test, a property declaration, a `files:` glob — is kebab because that is how frontmatter
 * spells one. One turn, in one place, so the two halves answer to the same names.
 */

import { kebabizeKey } from "@akasha/pages-access/file-rows"
import { carried, type Held, type Values } from "../carry/page-carry.module.code.ts"
import { partedIn } from "../file-name/page-file-name.module.code.ts"
import { wholeValue } from "../uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "../value/page-value.module.code.ts"

/** What an akasha page's file is named, as against `.md` for a markdown one. */
export const AKASHA_PAGE = ".ts"

export function isAkashaPage(relPath: string): boolean {
  return relPath.endsWith(AKASHA_PAGE)
}

export const SLUG = "slug"

export const PAGE_TYPE_SLUG = "page-type-slug"

/**
 * The declared object, kebab-keyed and carried as the text a query compares.
 *
 * Two keys come off the file name rather than out of the body. `bodyOf` writes neither the slug nor
 * the page type into an akasha page, because `day-2026-03-05.daily-tracking.ts` already says both
 * and a page saying them twice can say them differently. `partedIn` is where that name is read, and
 * a body that does state them keeps what it states — the days the migration converted state both,
 * and a reader that overwrote them would answer about a file rather than about a page.
 */
export function valuesOfDeclared(
  relPath: string,
  declared: Readonly<Record<string, unknown>>
): Values {
  const values: Record<string, Held> = {}
  for (const [key, held] of Object.entries(declared)) values[kebabizeKey(key)] = carried(held)
  const parted = partedIn(relPath)
  if (parted !== null) {
    values[SLUG] ??= parted.slug
    values[PAGE_TYPE_SLUG] ??= parted.pageType
  }
  return values
}

/**
 * One row beside an akasha page, keyed the way the query engine keys a markdown page's row.
 *
 * A row beside an akasha page states `startTime`, because `akasha write` judges every row against
 * the fields its entry property declares and reads a field by its slug written in camel. A row
 * beside a markdown page states `start-time`, because that is what the 780 rows already held. The
 * property declarations the deriver reads are kebab, so the camel half is turned and the kebab half
 * passes through unchanged — kebabising a kebab key answers the same key.
 */
export function kebabisedRow(values: Readonly<Record<string, unknown>>): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, held] of Object.entries(values)) out[kebabizeKey(key)] = held
  return out
}

/**
 * The page at `relPath` under `root`, or nothing where the body will not load.
 *
 * Nothing is the same answer `valuesIn` gives for a markdown file with no frontmatter fence, and the
 * caller notes it as unreadable rather than as absent — a page that will not load is not a page that
 * is not there.
 *
 * `wholeValue` puts back whatever the page keeps outside the commit, which is what akasha's own
 * asking does with a page value before anything reads it. What that asking also does and this does
 * not is turn an entry property into its rows: a day states `sessions: "jsonl"` and the rows are
 * pages of their own here, read from the `rows:` declaration, so keeping the extension is
 * what lets the deriver find them.
 */
export function akashaValuesAt(root: string, relPath: string): Values | null {
  const declared = valueAt(relPath, root)
  return declared === null ? null : valuesOfDeclared(relPath, wholeValue(root, relPath, declared))
}
