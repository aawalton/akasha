import { basename } from "node:path"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { saidInside } from "akasha/check/modules/shape-saying/shape-saying.module.code.ts"
import { folderOf } from "akasha/code/path/modules/between/code-path-between.module.code.ts"
import { slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import type { Held } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { strippedOf } from "akasha/page/naming/modules/folder-named/folder-named.module.code.ts"

const ROOT = ""

export type Answered = { readonly page: Held } | { readonly refusal: string }

export function onePageIn(standing: Standing, beside: Held | null = null): Answered {
  const page = standing.pages.find((one) => one !== beside)
  if (page === undefined) return { refusal: "it holds no page of its own" }
  if (standing.pages.length > (beside === null ? 1 : 2)) {
    return {
      refusal: `it holds ${standing.pages.length} pages rather than one: ${saidInside(standing.folder, standing.pages)}`,
    }
  }
  return { page }
}

export function looseFilesIn(
  standing: Standing,
  page: Held,
  parts: ReadonlySet<string>
): readonly string[] {
  const loose = standing.files.filter((one) => !parts.has(one))
  if (loose.length === 0) return []
  return [
    `${loose.length} files are no part of \`${page.slug}\`: ${saidInside(standing.folder, loose)}`,
  ]
}

function namesAbove(standing: Standing): readonly string[] {
  const found: string[] = []
  let at = standing.folder
  while (at !== ROOT) {
    at = folderOf(at)
    const held = standing.holds(at)[0]
    const slug = held === undefined ? null : slugIn(held)
    if (slug !== null) found.push(slug)
  }
  return found
}

function strippedAbove(standing: Standing, page: Held): string | null {
  if (page.slug === null) return null
  return strippedOf(page.slug, namesAbove(standing))
}

function gathersPage(standing: Standing, page: Held, named: string): boolean {
  const gathers = standing.gathered(named)
  if (page.pageTypeSlug !== null && gathers.includes(page.pageTypeSlug)) return true
  return page.slug !== null && gathers.includes(page.slug)
}

export function namedAsAsked(standing: Standing, page: Held): readonly string[] {
  const wants = standing.naming(standing.folder)
  if (wants === null) return []
  const named = basename(standing.folder)
  if (wants.name === named) return []
  if (strippedAbove(standing, page) === named) return []
  if (gathersPage(standing, page, named)) return []
  if (wants.name === null) {
    return [
      `it wants a name this check cannot work out: \`${page.slug}\` calls its folder \`${wants.gives}\`, which is what the page above it is named`,
    ]
  }
  return [
    `it is named \`${named}\` rather than \`${wants.name}\`, what \`${page.slug}\` calls its folder`,
  ]
}
