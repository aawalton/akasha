import { basename } from "node:path"
import { namedIn } from "@akasha/pages-system/page-file-name"
import { saidInside } from "../../../../../modules/shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

const PAGE_TYPE = "page-type"

const DOMAIN = "domain"

const PARTS = new Set<string>(["modules", "pages", "properties"])

function partOf(standing: Standing, at: string): boolean {
  const named = basename(at)
  if (PARTS.has(named)) return true
  if (standing.declaring(at)?.pluralSlug === named) return true
  return standing.under(at).some((one) => namedIn(one)?.tail === DOMAIN)
}

export function aPageWithItsParts(standing: Standing): readonly string[] {
  const said: string[] = []
  if (standing.strays.length > 0) {
    said.push(
      `${standing.strays.length} files are neither a page nor a file beside one: ${saidInside(standing.folder, standing.strays)}`
    )
  }
  if (standing.properties.length > 0) {
    said.push(
      `${standing.properties.length} files sit beside a page, and a page type carries no file of its own: ${saidInside(standing.folder, standing.properties)}`
    )
  }
  const other = standing.pages.filter((one) => one.pageTypeSlug !== PAGE_TYPE)
  if (other.length > 0) {
    said.push(`${other.length} pages here are no page type: ${saidInside(standing.folder, other)}`)
  }
  if (standing.pages.length > 1) {
    said.push(
      `it holds ${standing.pages.length} pages rather than one page type: ${saidInside(standing.folder, standing.pages)}`
    )
  }
  const own = standing.declaring(standing.folder)
  if (own === null) {
    if (said.length === 0) said.push("it holds no page type of its own")
    return said
  }
  const named = basename(standing.folder)
  if (own.pluralSlug !== named) {
    said.push(
      `it is named \`${named}\` rather than \`${own.pluralSlug}\`, the plural slug of \`${own.slug}\``
    )
  }
  const loose = standing.subfolders.filter((at) => !partOf(standing, at))
  if (loose.length > 0) {
    said.push(
      `${loose.length} subfolders are no part of \`${own.slug}\`: ${saidInside(standing.folder, loose)}`
    )
  }
  return said
}
