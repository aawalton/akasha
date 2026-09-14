import type { Standing } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-shapes/folder-shape.page-type.ts"
import { saidInside } from "akasha/checks/modules/shape-saying/shape-saying.module.code.ts"

export const SECTION = "book-section"

export function ofBookSections(standing: Standing, holder: string): readonly string[] {
  const said: string[] = []
  if (standing.strays.length > 0) {
    said.push(
      `${standing.strays.length} files are neither a section nor a file beside one: ${saidInside(standing.folder, standing.strays)}`
    )
  }
  const other = standing.pages.filter((one) => one.pageTypeSlug !== SECTION)
  if (other.length > 0) {
    said.push(
      `${other.length} pages here are not of \`${SECTION}\`: ${saidInside(standing.folder, other)}`
    )
  }
  const loose = standing.pages.filter(
    (one) => one.pageTypeSlug === SECTION && !standing.partOf(one).includes(holder)
  )
  if (loose.length > 0) {
    said.push(
      `${loose.length} sections here name \`${holder}\` nowhere as what holds them: ${saidInside(standing.folder, loose)}`
    )
  }
  const here = new Set<string>(standing.pages.map((one) => one.page ?? one.path))
  const stranded = standing.properties.filter((one) => !here.has(one.page ?? one.path))
  if (stranded.length > 0) {
    said.push(
      `${stranded.length} files sit beside no section here: ${saidInside(standing.folder, stranded)}`
    )
  }
  if (standing.pages.length === 0 && said.length === 0) said.push("it holds no section")
  return said
}
