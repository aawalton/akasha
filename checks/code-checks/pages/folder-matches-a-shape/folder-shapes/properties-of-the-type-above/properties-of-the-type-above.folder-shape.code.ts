import { basename, dirname } from "node:path"
import { saidInside } from "../../../../../modules/shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

const PROPERTY = "page-property"

const PROPERTIES = "properties"

export function propertiesOfTheTypeAbove(standing: Standing): readonly string[] {
  const said: string[] = []
  const named = basename(standing.folder)
  if (named !== PROPERTIES) said.push(`it is named \`${named}\` rather than \`${PROPERTIES}\``)
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
  const loose = standing.pages.filter(
    (one) => one.slug !== null && !above.propertySlugs.has(one.slug)
  )
  if (loose.length > 0) {
    said.push(
      `${loose.length} pages here are properties \`${above.slug}\` declares nowhere: ${saidInside(standing.folder, loose)}`
    )
  }
  return said
}
