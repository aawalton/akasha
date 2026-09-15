import { basename, dirname } from "node:path"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { saidInside } from "akasha/check/modules/shape-saying/shape-saying.module.code.ts"

const UNDER = "/"

function partAt(said: string, at: number): string {
  return said.split(UNDER)[at] ?? ""
}

function gathering(standing: Standing, wanted: readonly string[], pageTypeSlug: string): boolean {
  return wanted.some((one) => standing.extending(pageTypeSlug, one))
}

export function partsUnderTheirPlural(standing: Standing): readonly string[] {
  const named = basename(standing.folder)
  const wanted = standing.gathered(named)
  if (wanted.length === 0) {
    return [`it is named \`${named}\`, and no page type gathers its pages under that name`]
  }
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
    (one) => !gathering(standing, wanted, String(one.pageTypeSlug))
  )
  const elsewhere = standing.subfolders.filter(
    (at) => !standing.holds(at).some((one) => gathering(standing, wanted, partAt(one, 0)))
  )
  if (apart.length > 0 || elsewhere.length > 0) {
    said.push(
      `${apart.length + elsewhere.length} pages here are gathered under no \`${named}\`: ${saidInside(standing.folder, [...apart, ...elsewhere])}`
    )
  }
  const above = dirname(standing.folder)
  const holding = standing.holds(above)
  if (holding.length === 0) return said
  const declared = standing.declared(above)
  const loose = [
    ...standing.pages.filter((one) => !declared.has(`${one.pageTypeSlug}${UNDER}${one.slug}`)),
    ...standing.subfolders.filter((at) => !standing.holds(at).some((one) => declared.has(one))),
  ]
  if (loose.length > 0) {
    said.push(
      `${loose.length} pages here are no part \`${partAt(holding[0] ?? "", 1)}\` declares: ${saidInside(standing.folder, loose)}`
    )
  }
  return said
}
