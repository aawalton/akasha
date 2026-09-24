import { basename } from "node:path"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import {
  looseFilesIn,
  namedAsAsked,
  onePageIn,
  openingAbove,
} from "akasha/check/code/pages/folder-matches-a-shape/modules/one-page-only/one-page-only.module.code.ts"
import { saidInside } from "akasha/check/modules/shape-saying/shape-saying.module.code.ts"
import type { Held } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const DOMAIN = "domain"

const PAGE_TYPE = "page-type"

function besideIn(standing: Standing): Held | null {
  if (standing.pages.length !== 2) return null
  const holding = standing.holds(standing.folder)
  if (holding.length !== 2) return null
  const found = standing.pages.filter((one) => `${one.pageTypeSlug}/${one.slug}` === holding[1])
  return found.length === 1 ? (found[0] ?? null) : null
}

export function aDomainWithItsParts(standing: Standing): readonly string[] {
  const beside = besideIn(standing)
  const answered = onePageIn(standing, beside)
  if ("refusal" in answered) return [answered.refusal]
  const page = answered.page
  if (!standing.extending(String(page.pageTypeSlug), DOMAIN)) {
    return [`\`${page.slug}\` is a \`${page.pageTypeSlug}\` rather than a domain`]
  }
  if (standing.extending(String(page.pageTypeSlug), PAGE_TYPE)) {
    return [`\`${page.slug}\` is a page type, which has a shape of its own`]
  }
  const parts = new Set<string>([
    ...standing.parts(page),
    ...(beside === null ? [] : standing.parts(beside)),
  ])
  const said: string[] = [
    ...openingAbove(standing),
    ...looseFilesIn(standing, page, parts),
    ...namedAsAsked(standing, page),
  ]
  const declared = standing.declared(standing.folder)
  const stray = standing.subfolders.filter((at) => {
    if (standing.held.has(basename(at))) return false
    if (parts.has(at)) return false
    if ([...parts].some((one) => one.startsWith(`${at}/`))) return false
    const held = standing.holds(at)
    return !held.some((one) => declared.has(one))
  })
  if (stray.length > 0) {
    said.push(
      `${stray.length} subfolders are the folder of no part \`${page.slug}\` declares: ${saidInside(standing.folder, stray)}`
    )
  }
  return said
}
