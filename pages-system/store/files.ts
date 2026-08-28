/**
 * The only place this package touches a disk.
 *
 * Four questions are answered here and nothing else is: which files under a root are pages, what one
 * page's frontmatter says, which sidecars stand beside a page under one key, and what one file's
 * text is. Everything above this reads pages as values already gathered, which is what lets the rest
 * of the pages system stay pure.
 *
 * WHAT MAKES A FILE A PAGE IS ITS NAME, answered by `pageTypeOf` and by nothing else. No page type
 * states a glob, so nothing here consults a page type to find its pages: the walk visits every file
 * under the root and keeps the ones whose names carry a kind that was asked for. That is also the
 * seam. A caller cannot tell a walk from an index, so the page index can take this over without any
 * caller changing, and it should — a walk is right while it is cheap and says nothing about where
 * enumeration ought to come from.
 *
 * A SIDECAR IS FOUND BESIDE ITS PAGE RATHER THAN WALKED FOR. A page's rows stand in a file named for
 * the page and the key holding them, so the folder holding the page is the only folder to look in.
 * A walk of the root per page would be a walk per page.
 *
 * A FOLDER HOLDING NO PAGE IS NOT WALKED INTO. `.git` holds objects rather than files, and
 * `node_modules` holds other people's repositories; both are large enough that walking them would
 * be the whole cost of the walk.
 *
 * A SYMBOLIC LINK IS NOT FOLLOWED, so a link into a tree already walked cannot make a page appear
 * twice or a walk run forever.
 */

import { readdirSync, readFileSync } from "node:fs"
import { parse } from "yaml"
import { pageTypeOf } from "../page-type/page-type.ts"

/** What one page's frontmatter says, before any declared type is put to it. */
export type Stated = Readonly<Record<string, unknown>>

/** Folders no page stands in, and which cost more to walk than everything else together. */
const SKIPPED: ReadonlySet<string> = new Set([".git", "node_modules"])

/** What opens a page's frontmatter, and what closes it. */
const OPENS = "---\n"
const CLOSES = "\n---"

/** What ends the file a page stands in. */
const PAGE = ".md"

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
 *
 * THE PARSER IS THE ONE EVERY RUNTIME HAS. This read `Bun.YAML.parse`, which under node throws
 * `Bun is not defined` — into the refusal below, which then reported every page in the repository as
 * stating nothing readable. `pageTypesIn` skips a page whose frontmatter answered a string, so the
 * store answered a node caller an empty map of page types and told it the repository declares none.
 * The refusal is right for what it was written for and cannot tell a page whose YAML is bad from a
 * process with no YAML parser, so what must not come back is the runtime-specific parser.
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
    held = parse(text.slice(OPENS.length, closes + 1))
  } catch (why) {
    return `states nothing readable: ${why instanceof Error ? why.message : String(why)}`
  }
  if (held === null || typeof held !== "object" || Array.isArray(held)) {
    return "states nothing readable: its frontmatter is not a set of keys"
  }
  return held as Stated
}

/** The characters a folder listing may hold that a pattern would otherwise read as its own. */
const quoted = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

/**
 * Every sidecar standing beside the page at `at` under one key, in the order their rows run.
 *
 * A SIDECAR IS SPLIT WHERE IT GROWS PAST WHAT ONE FILE HOLDS, and the parts are numbered from the
 * second: the first part carries no number. They are answered in that order because the rows run
 * across them in it, and a reader taking them out of order would answer a page's rows shuffled.
 *
 * A SIDECAR NOT YET COMMITTED IS ANSWERED TOO, after the committed ones. What a page states in a
 * sidecar it states whether or not the sidecar has reached a commit, and a reader that saw only
 * committed rows would answer a page as empty for as long as its rows were new. No page in this
 * repository holds both kinds under one key, so the order between them settles nothing today; it is
 * fixed rather than left to a folder listing so that two runs answer alike.
 */
export const sidecarsOf = (root: string, at: string, key: string): readonly string[] => {
  const stem = at.endsWith(PAGE) ? at.slice(0, -PAGE.length) : at
  const cut = stem.lastIndexOf("/")
  const dir = cut < 0 ? "" : stem.slice(0, cut)
  const base = `${cut < 0 ? stem : stem.slice(cut + 1)}.${key}`
  const named = new RegExp(`^${quoted(base)}(?:\\.part(\\d+))?(\\.uncommitted)?\\.jsonl$`)
  const found: { readonly at: string; readonly part: number; readonly late: number }[] = []
  for (const entry of entriesIn(dir === "" ? root : `${root}/${dir}`)) {
    if (!entry.isFile()) continue
    const held = named.exec(entry.name)
    if (held === null) continue
    found.push({
      at: dir === "" ? entry.name : `${dir}/${entry.name}`,
      part: held[1] === undefined ? 1 : Number(held[1]),
      late: held[2] === undefined ? 0 : 1,
    })
  }
  found.sort((one, other) => one.late - other.late || one.part - other.part)
  return found.map((one) => one.at)
}

/**
 * The text of the file at `at`, or nothing where it could not be read.
 *
 * WHY IT COULD NOT BE READ IS NOT SAID, unlike `statedAt`. A sidecar that is not there is a page
 * holding no rows, which is an ordinary answer rather than a fault; a page file that is not there is
 * an address naming nothing, which is not.
 */
export const textAt = (root: string, at: string): string | null => {
  try {
    return readFileSync(`${root}/${at}`, "utf8")
  } catch {
    return null
  }
}
