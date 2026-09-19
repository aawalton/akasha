import { basename, dirname } from "node:path"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { kindsNamedBy } from "akasha/check/code/pages/folder-matches-a-shape/modules/kind-naming/kind-naming.module.code.ts"
import { saidInside } from "akasha/check/modules/shape-saying/shape-saying.module.code.ts"

const UNDER = "/"

export function pagesOfTheKindNamed(standing: Standing): readonly string[] {
  const named = basename(standing.folder)
  const over = basename(dirname(standing.folder))
  const wanted = standing.gathered(over)
  if (wanted.length === 0) {
    return [`the folder above is named \`${over}\`, and no page type gathers its pages under that`]
  }
  const kinds = kindsNamedBy(standing, wanted, named)
  const kind = kinds[0]
  if (kind === undefined) {
    return [`it is named \`${named}\`, and no page type \`${over}\` covers is named that`]
  }
  if (kinds.length > 1) {
    return [
      `it is named \`${named}\`, and \`${over}\` covers ${kinds.length} page types named that`,
    ]
  }
  const said: string[] = []
  if (standing.strays.length > 0) {
    said.push(
      `${standing.strays.length} files are neither a page nor a file beside one: ${saidInside(standing.folder, standing.strays)}`
    )
  }
  const apart = standing.pages.filter((one) => !standing.extending(String(one.pageTypeSlug), kind))
  const elsewhere = standing.subfolders.filter(
    (at) => !standing.holds(at).some((one) => standing.extending(one.split(UNDER)[0] ?? "", kind))
  )
  if (apart.length + elsewhere.length > 0) {
    said.push(
      `${apart.length + elsewhere.length} pages here are no \`${kind}\`: ${saidInside(standing.folder, [...apart, ...elsewhere])}`
    )
  }
  if (standing.pages.length === 0 && standing.subfolders.length === 0) said.push("it holds no page")
  return said
}
