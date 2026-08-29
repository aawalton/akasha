import type { Held } from "../../../../../pages-system/page/page-file-name.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

function named(folder: string, held: readonly Held[]): string {
  return held.map((one) => one.path.slice(folder.length + 1)).join(", ")
}

export function onePageWithItsProperties(standing: Standing): readonly string[] {
  if (standing.files.length === 0) return []
  const said: string[] = []
  if (standing.strays.length > 0) {
    said.push(
      `${standing.strays.length} files are neither a page nor a file standing beside one: ${named(standing.folder, standing.strays)}`
    )
  }
  const one = standing.pages[0]
  if (standing.pages.length === 0) said.push("it holds no page")
  if (standing.pages.length > 1) {
    said.push(
      `it holds ${standing.pages.length} pages rather than one: ${named(standing.folder, standing.pages)}`
    )
  }
  if (standing.pages.length === 1 && one !== undefined) {
    const loose = standing.properties.filter((each) => each.page !== one.page)
    if (loose.length > 0) {
      said.push(
        `${loose.length} files stand beside no page here: ${named(standing.folder, loose)}`
      )
    }
  }
  return said
}
