import { basename, dirname } from "node:path"
import { partedIn } from "@akasha/pages-system/page-file-name"
import { saidInside } from "../../../../../modules/shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

const PAGES = "pages"

const TS = "ts"

function ownPagesIn(standing: Standing, at: string, slug: string): number {
  return standing.under(at).filter((one) => {
    const said = partedIn(one)
    if (said === null || said.held !== TS || said.sections.length > 0) return false
    return said.pageType === slug
  }).length
}

export function pagesOfTheTypeAbove(standing: Standing): readonly string[] {
  const said: string[] = []
  const named = basename(standing.folder)
  if (named !== PAGES) said.push(`it is named \`${named}\` rather than \`${PAGES}\``)
  const above = standing.declaring(dirname(standing.folder))
  if (above === null) {
    said.push("the folder above holds no page type of its own")
    return said
  }
  if (standing.strays.length > 0) {
    said.push(
      `${standing.strays.length} files are neither a page nor a file beside one: ${saidInside(standing.folder, standing.strays)}`
    )
  }
  const carrying = [...new Set(standing.properties.map((one) => one.page ?? one.path))]
  if (carrying.length > 0) {
    said.push(
      `${carrying.length} pages carry a file beside them, and each belongs in a folder of its own: ${carrying.join(", ")}`
    )
  }
  const other = standing.pages.filter((one) => one.pageTypeSlug !== above.slug)
  if (other.length > 0) {
    said.push(
      `${other.length} pages here are not of \`${above.slug}\`: ${saidInside(standing.folder, other)}`
    )
  }
  if (standing.pages.length > 0 && standing.subfolders.length > 0) {
    said.push(
      `it holds page files alone or page folders alone, and ${standing.pages.length} pages here are files beside ${standing.subfolders.length} folders: ${saidInside(standing.folder, standing.pages)}`
    )
  }
  const loose = standing.subfolders.filter((at) => ownPagesIn(standing, at, above.slug) !== 1)
  if (loose.length > 0) {
    said.push(
      `${loose.length} subfolders hold no one page of \`${above.slug}\`: ${saidInside(standing.folder, loose)}`
    )
  }
  return said
}
