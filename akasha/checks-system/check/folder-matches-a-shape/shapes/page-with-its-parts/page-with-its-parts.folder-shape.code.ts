import { basename } from "node:path"
import type { Held } from "../../../../../pages-system/page/page-file-name.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

const MODULE = "module"

function named(folder: string, held: readonly Held[]): string {
  return held.map((one) => one.path.slice(folder.length + 1)).join(", ")
}

export function pageWithItsParts(standing: Standing): readonly string[] {
  if (standing.files.length === 0) return []
  const said: string[] = []
  if (standing.strays.length > 0) {
    said.push(
      `${standing.strays.length} files are neither a page nor a file standing beside one: ${named(standing.folder, standing.strays)}`
    )
  }
  const head = basename(standing.folder)
  const headline = standing.pages.filter((one) => one.slug === head)
  if (headline.length === 0) {
    said.push(`no page here is named \`${head}\`, for the folder holding it`)
  }
  if (headline.length > 1) {
    said.push(
      `${headline.length} pages here are named \`${head}\`: ${named(standing.folder, headline)}`
    )
  }
  const beside = standing.pages.filter((one) => one.slug !== head)
  const other = beside.filter((one) => one.pageTypeSlug !== MODULE)
  if (other.length > 0) {
    said.push(
      `${other.length} pages standing beside it are not modules: ${named(standing.folder, other)}`
    )
  }
  const here = new Set(standing.pages.map((one) => String(one.page)))
  const loose = standing.properties.filter((one) => !here.has(String(one.page)))
  if (loose.length > 0) {
    said.push(`${loose.length} files stand beside no page here: ${named(standing.folder, loose)}`)
  }
  return said
}
