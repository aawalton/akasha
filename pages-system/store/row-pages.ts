/**
 * The pages of a page type whose pages are rows, read one at a time.
 *
 * A PAGE TYPE STATING `files: none` HAS NO FILE PER PAGE. Each of its pages is one line of a sidecar
 * standing beside some other page, and `holdingsOf` says which pages those are and under which key.
 * This turns those lines into pages, under the types the page type declares, exactly as `pageAt`
 * does for a page that is a file.
 *
 * ONE SIDECAR'S TEXT AT A TIME IS ALL THAT IS HELD. A page type here holds three and a half million
 * rows across eleven thousand sidecars, so anything that gathered them would answer several
 * gigabytes. The sidecars are opened one after another and each row is handed on as it is read, so
 * what is held is the one sidecar being walked and the one row being answered.
 *
 * READING THE PAGES TWICE ANSWERS THEM TWICE. What comes back is an iterable rather than an
 * iterator, for the reason `rows.ts` gives: a caller that walks a set once to index it and again to
 * use it finds the second walk empty otherwise, and nothing says so.
 *
 * A SIDECAR THAT IS NOT THERE IS A PAGE HOLDING NO ROWS. That is an ordinary answer — most pages of
 * a holding page type hold none — and is not reported. A line that is there and is not a row is
 * reported, because the sidecar says it is a page and it cannot be read as one.
 */

import type { Value, Values } from "../formula/formula.ts"
import type { Declared, Page } from "../query/query.ts"
import { sidecarsOf, textAt } from "./files.ts"
import { valuedAs } from "./held.ts"
import { rowsIn } from "./rows.ts"
import type { Unread } from "./store.ts"

/** Where one holder page keeps rows: its own address, and the key it keeps them under. */
export type Where = {
  /** The holder page's address, as `pagesOf` answered it. */
  readonly at: string
  /** The key it holds them under, which is what names the sidecar beside it. */
  readonly key: string
}

/**
 * What the page at an address is called.
 *
 * A PAGE'S NAME IS ITS FILE'S STEM, the part before the suffixes naming its page type and its
 * format. Only a row naming itself nothing is named by it, so this is read no more often than that.
 */
const stemOf = (at: string): string => {
  const cut = at.lastIndexOf("/")
  const base = cut < 0 ? at : at.slice(cut + 1)
  const stop = base.indexOf(".")
  return stop < 0 ? base : base.slice(0, stop)
}

/** What one row holds, under the types its page type declares. */
const valuesOf = (
  stated: Readonly<Record<string, unknown>>,
  declared: Declared,
  now: number
): Values => {
  const properties: Record<string, Value> = {}
  for (const [key, property] of Object.entries(declared.properties)) {
    properties[key] = valuedAs(stated[key], property.type)
  }
  return { now, properties }
}

/** Walk every sidecar of every holder, yielding a page per row. */
function* walk(
  root: string,
  where: Iterable<Where>,
  declared: Declared,
  now: number
): Generator<Page | Unread> {
  for (const one of where) {
    const holder = stemOf(one.at)
    for (const sidecar of sidecarsOf(root, one.at, one.key)) {
      const text = textAt(root, sidecar)
      if (text === null) continue
      for (const row of rowsIn(sidecar, text, holder)) {
        if ("unread" in row) {
          yield row
          continue
        }
        yield { at: row.at, values: valuesOf(row.stated, declared, now) }
      }
    }
  }
}

/**
 * Every page a page type has, where its pages are rows.
 *
 * `where` NAMES THE HOLDER PAGES AND THE KEY, and is the caller's to work out: `holdingsOf` says
 * which page types hold this one's rows, `extendingIn` says which page types stand beneath those,
 * and `pagesOf` says which pages each of those has. Putting them together here would bake an order
 * of calls into a store whose whole shape is that it does not.
 *
 * THE ORDER IS THE ORDER THE HOLDERS ARRIVED IN, and within one holder the order its sidecar holds.
 * No other order is promised, as none is for a page type whose pages are files.
 */
export const rowPagesIn = (
  root: string,
  where: Iterable<Where>,
  declared: Declared,
  now: number
): Iterable<Page | Unread> => ({
  [Symbol.iterator]: () => walk(root, where, declared, now),
})
