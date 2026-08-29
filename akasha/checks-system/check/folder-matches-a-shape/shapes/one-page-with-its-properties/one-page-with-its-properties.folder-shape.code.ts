import { saidInside } from "../../../../shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

export function onePageWithItsProperties(standing: Standing): readonly string[] {
  if (standing.files.length === 0) return []
  const said: string[] = []
  if (standing.strays.length > 0) {
    said.push(
      `${standing.strays.length} files are neither a page nor a file standing beside one: ${saidInside(standing.folder, standing.strays)}`
    )
  }
  const one = standing.pages[0]
  if (standing.pages.length === 0) said.push("it holds no page")
  if (standing.pages.length > 1) {
    said.push(
      `it holds ${standing.pages.length} pages rather than one: ${saidInside(standing.folder, standing.pages)}`
    )
  }
  if (standing.pages.length === 1 && one !== undefined) {
    const loose = standing.properties.filter((each) => each.page !== one.page)
    if (loose.length > 0) {
      said.push(
        `${loose.length} files stand beside no page here: ${saidInside(standing.folder, loose)}`
      )
    }
  }
  return said
}
