/**
 * What page type a file is of, worked out from its name alone.
 *
 * A file's KIND is the word its name carries between its stem and `.md`: `pilot.domain.md` is of
 * kind `domain`. The kind settles the file's page type. Its frontmatter must agree with the kind
 * and does not decide it, and no page type states a glob.
 *
 * PURE, TOTAL, NO I/O. This reads the name and nothing else — no disk, no page index, no register
 * of which page types there are. Whether the kind names a page type that stands here, and whether
 * the file's frontmatter agrees with it, have a different answer source; each is a check that
 * calls this rather than a part of what this answers.
 */

/** A page is a markdown file, and no other name carries a kind. */
const MARKDOWN = ".md"

const DOT = "."

const SLASH = "/"

/**
 * The page type `path` is of, or `null` where its name carries no kind.
 *
 * ONLY THE LAST PATH SEGMENT IS READ, so a directory holding a dot contributes nothing —
 * `system/etc-sysctl.d/README.md` carries no kind — and a bare name with no directory answers the
 * same as the whole path to it. An absolute path and a repo-relative one therefore agree, and a
 * caller holding either needs no normalising first.
 *
 * A NAME NOT ENDING `.md` CARRIES NO KIND, which is what keeps a sidecar out. The rows beside a
 * page (`x.seat-log-day.lines.jsonl`), an uncommitted sidecar (`x.domain.uncommitted.yaml`) and a
 * code attachment (`x.check.code.attachment.ts`) all answer `null`, because the page is the
 * markdown file and what stands beside it is not the page. Reading the word before the last dot
 * instead would have called that yaml sidecar a page of kind `uncommitted`.
 *
 * ONE DOT IS AN EXTENSION RATHER THAN A KIND, so `README.md` answers `null`. Every markdown file
 * here named that way states no `page-type-slug` of its own.
 *
 * A NAME WITH NOTHING IN FRONT OF THE KIND CARRIES NONE, so `.domain.md` answers `null`. A page is
 * named by its stem, and a name that is all suffix is configuration rather than a page.
 *
 * WHAT THE KIND IS SPELT WITH IS NOT JUDGED HERE. `notes.v2.md` answers `v2`, which names no page
 * type — and finding that out takes the register this deliberately does not hold. Every distinct
 * kind standing in this repository is a declared page type, so no incidental dot asks to be
 * filtered out, and a filter would be a third opinion on how a slug is spelt.
 *
 * AN ATTACHMENT NAMED `.md` IS NOT SET APART. `x.check.code.attachment.md` answers `attachment`,
 * which names no page type. No attachment here is named `.md`, and how an attachment is named is
 * already stated in one place, so restating it here would be another copy of the sort of thing
 * this function exists to remove.
 */
export function pageTypeOf(path: string): string | null {
  const name = path.slice(path.lastIndexOf(SLASH) + 1)
  if (!name.endsWith(MARKDOWN)) return null
  const rest = name.slice(0, -MARKDOWN.length)
  const dot = rest.lastIndexOf(DOT)
  if (dot <= 0) return null
  const kind = rest.slice(dot + 1)
  return kind === "" ? null : kind
}
