import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { ofPropertyPages } from "akasha/check/code/pages/folder-matches-a-shape/modules/property-pages/property-pages.module.code.ts"

export const HOLDS = ["properties"]

export function propertyPagesOnly(standing: Standing): readonly string[] {
  if (standing.files.length === 0) return []
  const said = [...ofPropertyPages(standing)]
  if (standing.pages.length === 0 && said.length === 0) said.push("it holds no page")
  return said
}
