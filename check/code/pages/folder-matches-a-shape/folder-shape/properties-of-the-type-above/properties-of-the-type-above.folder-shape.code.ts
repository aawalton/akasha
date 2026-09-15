import { dirname } from "node:path"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { ofPropertyPages } from "akasha/check/code/pages/folder-matches-a-shape/modules/property-pages/property-pages.module.code.ts"
import { saidInside } from "akasha/check/modules/shape-saying/shape-saying.module.code.ts"

export const HOLDS = ["properties"]

export function propertiesOfTheTypeAbove(standing: Standing): readonly string[] {
  const above = standing.declaring(dirname(standing.folder))
  if (above === null) return ["the folder above holds no page type of its own"]
  const said = [...ofPropertyPages(standing)]
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
