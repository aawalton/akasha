import type { Held } from "../../../../../pages-system/page/page-file-name.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

const PROPERTY = "page-property"

function named(folder: string, held: readonly Held[]): string {
  return held.map((one) => one.path.slice(folder.length + 1)).join(", ")
}

export function propertyPagesOnly(standing: Standing): readonly string[] {
  if (standing.files.length === 0) return []
  const said: string[] = []
  if (standing.strays.length > 0) {
    said.push(
      `${standing.strays.length} files are neither a page nor a file standing beside one: ${named(standing.folder, standing.strays)}`
    )
  }
  if (standing.properties.length > 0) {
    said.push(
      `${standing.properties.length} files stand beside a page, and a property page carries no file of its own: ${named(standing.folder, standing.properties)}`
    )
  }
  const other = standing.pages.filter(
    (one) => !standing.extending(String(one.pageTypeSlug), PROPERTY)
  )
  if (other.length > 0) {
    said.push(
      `${other.length} pages here are of a page type that does not extend \`${PROPERTY}\`: ${named(standing.folder, other)}`
    )
  }
  if (standing.pages.length === 0 && said.length === 0) said.push("it holds no page")
  return said
}
