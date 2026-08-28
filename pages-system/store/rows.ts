/**
 * The rows a page holds in a sidecar beside it, read one at a time.
 *
 * A PAGE IS A FILE AND ITS ROWS ARE A SIDECAR BESIDE IT. A page type stating `files: none` has no
 * file of its own, and each of its pages is one line of another page's sidecar. This reads those
 * lines into pages.
 *
 * ONE ROW AT A TIME, DELIBERATELY. A single sidecar in this repository holds thirty thousand lines
 * and the whole set holds three and a half million, so a reader answering an array would build
 * several gigabytes before its caller saw the first row. This answers an iterable and holds one row
 * at a time. The text it walks is the only thing it keeps, and it walks that text by looking for the
 * next line break rather than by splitting it, which would make a string per line before the first
 * one was read.
 *
 * READING THE ROWS TWICE ANSWERS THEM TWICE. What comes back is an iterable rather than an iterator:
 * each walk of it starts again. An iterator would be emptied by its first reader, and a second
 * reader would find nothing there and say so to nobody — which is how a caller that reads a set once
 * to index it and again to use it goes silently empty.
 *
 * A LINE THAT IS NOT A ROW IS ANSWERED RATHER THAN SKIPPED. A sidecar line that is not one JSON
 * object names no page, and a reader dropping it would answer fewer pages than the file holds with
 * nothing saying so. It arrives among the rows as an unread, in the same shape `pageAt` answers for
 * a file it could not read.
 *
 * PURE. The text arrives as an argument, so this reads no file and holds no clock. What reads a file
 * is `files.ts`.
 */

import type { Stated } from "./files.ts"

/**
 * What a row is named by, in the order tried.
 *
 * A ROW'S NAME IS ITS OWN, NOT ITS PLACE. A row states what it is called and keeps that name when a
 * line is inserted above it; a place in a file does not. A row naming itself neither is named by its
 * holder and its place, which is the one case where a name moves.
 */
const NAMING: readonly string[] = ["slug", "id"]

/** What separates the sidecar an address names from the row's name within it. */
const AT = "#"

/** What ends a line. */
const BREAK = "\n"

/** One row, as a page. */
export type RowPage = {
  /** Where the row stands: its sidecar, and its name within it. */
  readonly at: string
  /** What the row is called, which is what a page of this page type is addressed by. */
  readonly name: string
  /** What the row states, before any declared type is put to it. */
  readonly stated: Stated
}

/** One line of a sidecar that is not a row, and why. */
export type RowUnread = {
  /** Where the line stands: its sidecar, and its number within it. */
  readonly at: string
  /** What was wrong, in the terms a reader of the sidecar would put it. */
  readonly unread: string
}

/** What one row names itself, or nothing where it names itself nothing. */
const namedIn = (stated: Stated): string | null => {
  for (const key of NAMING) {
    const held = stated[key]
    if (typeof held === "string" && held.trim() !== "") return held.trim()
  }
  return null
}

/**
 * What one line states, or nothing where it is not one JSON object.
 *
 * AN ARRAY AND A BARE VALUE ARE BOTH REFUSED. A row is a set of keys, and reading `[1,2]` or `7` as
 * one would answer a page holding nothing under every key its page type declares.
 */
const statedIn = (line: string): Stated | null => {
  let held: unknown
  try {
    held = JSON.parse(line)
  } catch {
    return null
  }
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  return held as Stated
}

/** Walk one sidecar's text, yielding a page per line that is one, and an unread per line that is not. */
function* walk(at: string, text: string, holder: string): Generator<RowPage | RowUnread> {
  let from = 0
  let line = 0
  while (from < text.length) {
    const ends = text.indexOf(BREAK, from)
    const held = (ends < 0 ? text.slice(from) : text.slice(from, ends)).trim()
    from = ends < 0 ? text.length : ends + 1
    line += 1
    if (held === "") continue
    const stated = statedIn(held)
    if (stated === null) {
      yield { at: `${at}${AT}${line}`, unread: `line ${line} is not one JSON object, so it names no page` }
      continue
    }
    const name = namedIn(stated) ?? `${holder}${AT}${line}`
    yield { at: `${at}${AT}${name}`, name, stated }
  }
}

/**
 * Every row one sidecar holds, in the order the file holds them.
 *
 * `holder` NAMES THE PAGE THE SIDECAR STANDS BESIDE, and is used only to name a row that names
 * itself nothing. A row that states a `slug` or an `id` is named by it whichever page holds it.
 */
export const rowsIn = (at: string, text: string, holder: string): Iterable<RowPage | RowUnread> => ({
  [Symbol.iterator]: () => walk(at, text, holder),
})
