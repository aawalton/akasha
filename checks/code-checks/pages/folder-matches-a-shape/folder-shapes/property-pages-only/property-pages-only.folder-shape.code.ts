import { basename } from "node:path"
import { saidInside } from "../../../../../modules/shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

const PROPERTY = "page-property"

const PROPERTIES = "properties"

export function propertyPagesOnly(standing: Standing): readonly string[] {
  const named = basename(standing.folder)
  const misnamed =
    named === PROPERTIES ? [] : [`it is named \`${named}\` rather than \`${PROPERTIES}\``]
  if (standing.files.length === 0) return misnamed
  const said: string[] = []
  if (standing.strays.length > 0) {
    said.push(
      `${standing.strays.length} files are neither a page nor a file beside one: ${saidInside(standing.folder, standing.strays)}`
    )
  }
  if (standing.properties.length > 0) {
    said.push(
      `${standing.properties.length} files sit beside a page, and a property page carries no file of its own: ${saidInside(standing.folder, standing.properties)}`
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
  return [...said, ...misnamed]
}
