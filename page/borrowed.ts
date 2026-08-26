import { readdirSync } from "node:fs"
import { blockOf, stringAt, textAt } from "./text.ts"

export const BORROWED_REPO = "instructions"

export const BORROWED_PAGE_TYPE_DIRS: Readonly<Record<string, string>> = {
  "page-type": "pages/page-type",
  "page-property-type": "pages/page-property-type",
  "page-property-definition": "pages/page-property-definition",
  "file-kind-domain": "pages/file-kind",
}

export const BORROWED_PAGE_TYPES: readonly string[] = Object.keys(BORROWED_PAGE_TYPE_DIRS)

const PAGE_TYPE = "page-type"

const MARKDOWN = ".md"

const SLUG = "slug"

const EXTENDS_SLUG = "extends-slug"

export function borrowedPages(root: string, slug: string): readonly string[] {
  const dir = BORROWED_PAGE_TYPE_DIRS[slug]
  if (dir === undefined) return []
  let names: readonly string[]
  try {
    names = readdirSync(`${root}/${dir}`)
  } catch {
    return []
  }
  return names
    .filter((one) => one.endsWith(MARKDOWN))
    .map((one) => `${dir}/${one}`)
    .sort()
}

export type BorrowedPageType = {
  readonly slug: string
  readonly extends: string | null
}

function stemOf(relPath: string): string {
  const name = relPath.slice(relPath.lastIndexOf("/") + 1)
  const dot = name.indexOf(".")
  return dot <= 0 ? name : name.slice(0, dot)
}

export function borrowedPageTypes(root: string): readonly BorrowedPageType[] {
  const found: BorrowedPageType[] = []
  for (const relPath of borrowedPages(root, PAGE_TYPE)) {
    const text = textAt(root, relPath)
    if (text === null) continue
    const { fm, why } = blockOf(text)
    if (why !== null) continue
    found.push({ slug: stringAt(fm, SLUG) ?? stemOf(relPath), extends: stringAt(fm, EXTENDS_SLUG) })
  }
  return found
}
