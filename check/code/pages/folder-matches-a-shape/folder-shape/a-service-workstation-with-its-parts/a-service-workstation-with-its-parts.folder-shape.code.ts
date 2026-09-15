import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import {
  looseFilesIn,
  onePageIn,
} from "akasha/check/code/pages/folder-matches-a-shape/modules/one-page-only/one-page-only.module.code.ts"
import { saidInside } from "akasha/check/modules/shape-saying/shape-saying.module.code.ts"

export const HOLDS = ["service-workstations"]

const SERVICE = "service-workstation"

export function aServiceWorkstationWithItsParts(standing: Standing): readonly string[] {
  const answered = onePageIn(standing)
  if ("refusal" in answered) return [answered.refusal]
  const page = answered.page
  if (page.pageTypeSlug !== SERVICE) {
    return [`\`${page.slug}\` is a \`${page.pageTypeSlug}\` rather than a \`${SERVICE}\``]
  }
  const parts = new Set<string>(standing.parts(page))
  const said: string[] = [...looseFilesIn(standing, page, parts)]
  if (standing.subfolders.length > 0) {
    said.push(
      `${standing.subfolders.length} subfolders sit in it, and a service holds none: ${saidInside(standing.folder, standing.subfolders)}`
    )
  }
  return said
}
