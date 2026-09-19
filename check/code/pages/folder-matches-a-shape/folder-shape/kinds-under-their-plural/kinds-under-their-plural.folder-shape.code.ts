import { basename } from "node:path"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { kindsNamedBy } from "akasha/check/code/pages/folder-matches-a-shape/modules/kind-naming/kind-naming.module.code.ts"
import { saidInside } from "akasha/check/modules/shape-saying/shape-saying.module.code.ts"

export function kindsUnderTheirPlural(standing: Standing): readonly string[] {
  const named = basename(standing.folder)
  const wanted = standing.gathered(named)
  if (wanted.length === 0) {
    return [`it is named \`${named}\`, and no page type gathers its pages under that name`]
  }
  const said: string[] = []
  if (standing.files.length > 0) {
    said.push(
      `${standing.files.length} files sit here, and a folder gathering page types holds none: ${saidInside(standing.folder, standing.files)}`
    )
  }
  const apart = standing.subfolders.filter(
    (at) => kindsNamedBy(standing, wanted, basename(at)).length === 0
  )
  if (apart.length > 0) {
    said.push(
      `${apart.length} subfolders are named for no page type \`${named}\` covers: ${saidInside(standing.folder, apart)}`
    )
  }
  if (standing.subfolders.length === 0 && said.length === 0) said.push("it gathers nothing")
  return said
}
