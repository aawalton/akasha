import { readFileSync } from "node:fs"
import { isMissing } from "../../missing/missing.ts"
import { type Frontmatter, parseFrontmatter } from "../frontmatter.ts"

export const NONE = "none"

/**
 * NULL MEANS THE FILE IS NOT THERE, and nothing else.
 *
 * Every caller reads `null` as "no such file, so this page states nothing here" and goes on to
 * answer, or to write, on that footing. A read that failed for any other reason has not established
 * that, so it raises rather than borrowing the word for absence: an unreadable page would otherwise
 * read as a page holding nothing, which is a different and false claim about the same file.
 */
export function textAt(root: string, relPath: string): string | null {
  try {
    return readFileSync(`${root}/${relPath}`, "utf8")
  } catch (thrown) {
    if (isMissing(thrown)) return null
    throw thrown
  }
}

export function blockOf(text: string): { fm: Frontmatter; why: string | null } {
  const fm = parseFrontmatter(text)
  if (!fm.present)
    return { fm, why: "it opens with no `---` frontmatter block, so it declares nothing" }
  if (fm.error !== null) return { fm, why: `its frontmatter cannot be accounted for: ${fm.error}` }
  return { fm, why: null }
}

export function stringAt(fm: Frontmatter, key: string): string | null {
  const value = fm.fields.get(key)
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null
}
