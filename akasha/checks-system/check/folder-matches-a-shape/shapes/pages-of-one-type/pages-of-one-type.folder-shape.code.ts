import type { Held } from "../../../../../pages-system/page/page-file-name.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

function named(folder: string, held: readonly Held[]): string {
  return held.map((one) => one.path.slice(folder.length + 1)).join(", ")
}

export function pagesOfOneType(standing: Standing): readonly string[] {
  if (standing.files.length === 0) return []
  const said: string[] = []
  if (standing.strays.length > 0) {
    said.push(
      `${standing.strays.length} files are neither a page nor a file standing beside one: ${named(standing.folder, standing.strays)}`
    )
  }
  if (standing.properties.length > 0) {
    said.push(
      `${standing.properties.length} files stand beside a page rather than being pages: ${named(standing.folder, standing.properties)}`
    )
  }
  const kinds = [...new Set(standing.pages.map((one) => String(one.pageTypeSlug)))].sort()
  if (kinds.length > 1) {
    said.push(`its pages are of ${kinds.length} page types: ${kinds.join(", ")}`)
  }
  if (standing.pages.length === 0 && said.length === 0) said.push("it holds no page")
  return said
}
