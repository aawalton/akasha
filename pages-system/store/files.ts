/**
 * The only place this package touches a disk.
 *
 * Two questions are answered here and nothing else is: which files under a root are pages, and what
 * one page's frontmatter says. Everything above this reads pages as values already gathered, which
 * is what lets the rest of the pages system stay pure.
 *
 * WHAT MAKES A FILE A PAGE IS ITS NAME, answered by `pageTypeOf` and by nothing else. No page type
 * states a glob, so nothing here consults a page type to find its pages: the walk visits every file
 * under the root and keeps the ones whose names carry a kind that was asked for. That is also the
 * seam. A caller cannot tell a walk from an index, so the page index can take this over without any
 * caller changing, and it should — a walk is right while it is cheap and says nothing about where
 * enumeration ought to come from.
 *
 * A FOLDER HOLDING NO PAGE IS NOT WALKED INTO. `.git` holds objects rather than files, and
 * `node_modules` holds other people's repositories; both are large enough that walking them would
 * be the whole cost of the walk.
 *
 * A SYMBOLIC LINK IS NOT FOLLOWED, so a link into a tree already walked cannot make a page appear
 * twice or a walk run forever.
 */

import { readdirSync, readFileSync } from "node:fs"
import { pageTypeOf } from "../page-type/page-type.ts"

/** What one page's frontmatter says, before any declared type is put to it. */
export type Stated = Readonly<Record<string, unknown>>

/** Folders no page stands in, and which cost more to walk than everything else together. */
const SKIPPED: ReadonlySet<string> = new Set([".git", "node_modules"])

/** What opens a page's frontmatter, and what closes it. */
const OPENS = "---\n"
const CLOSES = "\n---"

/** What stands in a folder, or nothing where it cannot be opened. */
const entriesIn = (dir: string) => {
  try {
    return readdirSync(dir, { withFileTypes: true })
  } catch {
    return []
  }
}

/**
 * Every page under `root` whose kind was asked for, as paths relative to the root, keyed by kind.
 *
 * A kind asked for and not found answers an empty list rather than nothing, so a caller need not
 * tell "no pages of that kind" from "did not ask".
 */
export const pagesUnder = (
  root: string,
  kinds: ReadonlySet<string>
): ReadonlyMap<string, readonly string[]> => {
  const found = new Map<string, string[]>()
  for (const kind of kinds) found.set(kind, [])
  const walk = (at: string): void => {
    for (const entry of entriesIn(at === "" ? root : `${root}/${at}`)) {
      if (entry.isSymbolicLink()) continue
      const under = at === "" ? entry.name : `${at}/${entry.name}`
      if (entry.isDirectory()) {
        if (!SKIPPED.has(entry.name)) walk(under)
        continue
      }
      const kind = pageTypeOf(entry.name)
      if (kind === null) continue
      found.get(kind)?.push(under)
    }
  }
  walk("")
  return found
}

/**
 * What the page at `at` states, or one line saying why nothing could be read from it.
 *
 * A REFUSAL IS A STRING AND AN ANSWER IS NOT, which is what tells them apart. A page's own
 * frontmatter can carry any key at all, so a marker key on the answer would be a key a page could
 * write for itself.
 *
 * FRONTMATTER IS YAML AND IS READ AS YAML. A page whose frontmatter is not YAML is refused here
 * rather than half-read, because a lenient reader would answer a value for a line it did not
 * understand, and that value would then decide what a query matched.
 */
export const statedAt = (root: string, at: string): Stated | string => {
  let text: string
  try {
    text = readFileSync(`${root}/${at}`, "utf8")
  } catch (why) {
    return `cannot be read: ${why instanceof Error ? why.message : String(why)}`
  }
  if (!text.startsWith(OPENS)) return "states nothing: it opens with no frontmatter"
  const closes = text.indexOf(CLOSES, OPENS.length)
  if (closes < 0) return "states nothing: its frontmatter is opened and never closed"
  let held: unknown
  try {
    held = Bun.YAML.parse(text.slice(OPENS.length, closes + 1))
  } catch (why) {
    return `states nothing readable: ${why instanceof Error ? why.message : String(why)}`
  }
  if (held === null || typeof held !== "object" || Array.isArray(held)) {
    return "states nothing readable: its frontmatter is not a set of keys"
  }
  return held as Stated
}
