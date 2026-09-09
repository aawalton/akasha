import { dirname } from "node:path"
import { saidInside } from "../../../../../modules/shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

export const HOLDS = "pages"

const MOST = 5

export function pagesWithTheirFilesBesideThem(standing: Standing): readonly string[] {
  const said: string[] = []
  const above = standing.declaring(dirname(standing.folder))
  if (above === null) {
    said.push("the folder above holds no page type of its own")
    return said
  }
  if (standing.subfolders.length > 0) {
    said.push(
      `${standing.subfolders.length} folders sit inside, and every page here is a file: ${saidInside(standing.folder, standing.subfolders, MOST)}`
    )
  }
  if (standing.strays.length > 0) {
    said.push(
      `${standing.strays.length} files are neither a page nor a file beside one: ${saidInside(standing.folder, standing.strays, MOST)}`
    )
  }
  const other = standing.pages.filter((one) => one.pageTypeSlug !== above.slug)
  if (other.length > 0) {
    said.push(
      `${other.length} pages here are not of \`${above.slug}\`: ${saidInside(standing.folder, other, MOST)}`
    )
  }
  const claimed = new Set<string>(standing.pages.flatMap((one) => standing.parts(one)))
  const strayed = new Set<string>(standing.strays.map((one) => one.path))
  const loose = standing.files.filter((one) => !claimed.has(one) && !strayed.has(one))
  if (loose.length > 0) {
    said.push(
      `${loose.length} files here sit beside a page that states no such file: ${saidInside(standing.folder, loose, MOST)}`
    )
  }
  if (standing.pages.length === 0 && said.length === 0) said.push("it holds no page")
  return said
}
