import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { saidInside } from "akasha/check/modules/shape-saying/shape-saying.module.code.ts"

function among(standing: Standing, wanted: readonly string[], pageTypeSlug: string): boolean {
  return wanted.some((one) => standing.extending(pageTypeSlug, one))
}

export function ofCollectionParts(
  standing: Standing,
  holder: string,
  wanted: readonly string[]
): readonly string[] {
  const said: string[] = []
  if (standing.strays.length > 0) {
    said.push(
      `${standing.strays.length} files are neither a page nor a file beside one: ${saidInside(standing.folder, standing.strays)}`
    )
  }
  const other = standing.pages.filter((one) => !among(standing, wanted, String(one.pageTypeSlug)))
  if (other.length > 0) {
    const named = wanted.map((one) => `\`${one}\``).join(" or ")
    said.push(
      `${other.length} pages here are of none of ${named}: ${saidInside(standing.folder, other)}`
    )
  }
  const loose = standing.pages.filter(
    (one) =>
      among(standing, wanted, String(one.pageTypeSlug)) && !standing.partOf(one).includes(holder)
  )
  if (loose.length > 0) {
    said.push(
      `${loose.length} pages here name \`${holder}\` nowhere as what holds them: ${saidInside(standing.folder, loose)}`
    )
  }
  const here = new Set<string>(standing.pages.map((one) => one.page ?? one.path))
  const stranded = standing.properties.filter((one) => !here.has(one.page ?? one.path))
  if (stranded.length > 0) {
    said.push(
      `${stranded.length} files sit beside no page here: ${saidInside(standing.folder, stranded)}`
    )
  }
  if (standing.pages.length === 0 && said.length === 0) said.push("it holds no page")
  return said
}
