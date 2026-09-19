import { basename } from "node:path"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { saidInside } from "akasha/check/modules/shape-saying/shape-saying.module.code.ts"

function covered(standing: Standing, wanted: readonly string[], pageTypeSlug: string): boolean {
  return wanted.some((one) => standing.extending(pageTypeSlug, one))
}

function namedFor(standing: Standing, wanted: readonly string[], name: string): boolean {
  if (covered(standing, wanted, name)) return true
  if (wanted.some((one) => one.endsWith(`-${name}`))) return true
  return standing.gathered(name).some((one) => covered(standing, wanted, one))
}

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
  const apart = standing.subfolders.filter((at) => !namedFor(standing, wanted, basename(at)))
  if (apart.length > 0) {
    said.push(
      `${apart.length} subfolders are named for no page type \`${named}\` covers: ${saidInside(standing.folder, apart)}`
    )
  }
  if (standing.subfolders.length === 0 && said.length === 0) said.push("it gathers nothing")
  return said
}
