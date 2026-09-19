import { basename, dirname } from "node:path"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { covering } from "akasha/check/code/pages/folder-matches-a-shape/modules/kind-naming/kind-naming.module.code.ts"
import { saidInside } from "akasha/check/modules/shape-saying/shape-saying.module.code.ts"

const UNDER = "/"

export function partsUnderThePageTheyName(standing: Standing): readonly string[] {
  const named = basename(standing.folder)
  const wanted = standing.gathered(named)
  if (wanted.length === 0) {
    return [`it is named \`${named}\`, and no page type gathers its pages under that name`]
  }
  const above = standing.holds(dirname(standing.folder))
  const first = above[0]
  if (first === undefined) return ["the folder above holds no page of its own"]
  const here = [
    ...standing.pages.map((one) => one.path),
    ...standing.subfolders.flatMap((at) => standing.pathsHeld(at)),
  ]
  const naming = new Set<string>(here.flatMap((at) => standing.addressing(at)))
  const holder = above.find((one) => naming.has(one)) ?? first
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
  const apart = standing.pages.filter(
    (one) => !covering(standing, wanted, String(one.pageTypeSlug))
  )
  const elsewhere = standing.subfolders.filter(
    (at) => !standing.holds(at).some((one) => covering(standing, wanted, one.split(UNDER)[0] ?? ""))
  )
  if (apart.length + elsewhere.length > 0) {
    said.push(
      `${apart.length + elsewhere.length} pages here are gathered under no \`${named}\`: ${saidInside(standing.folder, [...apart, ...elsewhere])}`
    )
  }
  const loose = [
    ...standing.pages.filter(
      (one) =>
        covering(standing, wanted, String(one.pageTypeSlug)) &&
        !standing.addressing(one.path).includes(holder)
    ),
    ...standing.subfolders.filter(
      (at) =>
        !elsewhere.includes(at) &&
        !standing.pathsHeld(at).some((one) => standing.addressing(one).includes(holder))
    ),
  ]
  if (loose.length > 0) {
    said.push(
      `${loose.length} pages here name \`${holder}\` nowhere: ${saidInside(standing.folder, loose)}`
    )
  }
  if (standing.pages.length === 0 && standing.subfolders.length === 0) said.push("it holds no page")
  return said
}
