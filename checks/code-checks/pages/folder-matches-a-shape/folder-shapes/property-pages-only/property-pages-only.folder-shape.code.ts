import { saidInside } from "../../../../../modules/shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

export const HOLDS = ["properties"]

const PROPERTY = "page-property"

export function propertyPagesOnly(standing: Standing): readonly string[] {
  if (standing.files.length === 0) return []
  const said: string[] = []
  if (standing.strays.length > 0) {
    said.push(
      `${standing.strays.length} files are neither a page nor a file beside one: ${saidInside(standing.folder, standing.strays)}`
    )
  }
  const claimed = new Set<string>(standing.pages.flatMap((one) => standing.parts(one)))
  const beside = standing.properties.filter((one) => !claimed.has(one.path))
  if (beside.length > 0) {
    said.push(
      `${beside.length} files sit beside a page that states no such file: ${saidInside(standing.folder, beside)}`
    )
  }
  const other = standing.pages.filter(
    (one) => !standing.extending(String(one.pageTypeSlug), PROPERTY)
  )
  if (other.length > 0) {
    said.push(
      `${other.length} pages here are of a page type that does not extend \`${PROPERTY}\`: ${saidInside(standing.folder, other)}`
    )
  }
  if (standing.pages.length === 0 && said.length === 0) said.push("it holds no page")
  return said
}
