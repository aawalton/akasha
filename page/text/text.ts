import { readFileSync } from "node:fs"
import { type Frontmatter, parseFrontmatter } from "../frontmatter.ts"

export const NONE = "none"

export const PAGE_TYPE_SLUG = "page-type-slug"

export function textAt(root: string, relPath: string): string | null {
  try {
    return readFileSync(`${root}/${relPath}`, "utf8")
  } catch {
    return null
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
