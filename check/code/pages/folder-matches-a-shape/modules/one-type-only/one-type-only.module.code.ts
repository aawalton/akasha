import { dirname } from "node:path"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { saidInside } from "akasha/check/modules/shape-saying/shape-saying.module.code.ts"

type Wanted = {
  readonly pageTypeSlug: string
  readonly one: string
  readonly many: string
  readonly declared?: boolean
}

export function ofOneTypeOnly(standing: Standing, wanted: Wanted): readonly string[] {
  const said: string[] = []
  if (standing.files.length > 0) {
    said.push(
      `${standing.files.length} files sit in it, and a ${wanted.one} has a folder to itself: ${saidInside(standing.folder, standing.files)}`
    )
  }
  const above = dirname(standing.folder)
  const holding = standing.holds(above)
  const declared = standing.declared(above)
  const other: string[] = []
  const loose: string[] = []
  for (const at of standing.subfolders) {
    const held = standing.holds(at)
    if (!held.some((one) => standing.extending(one.split("/")[0] ?? "", wanted.pageTypeSlug))) {
      other.push(at)
      continue
    }
    if (wanted.declared === false) continue
    if (holding.length > 0 && !held.some((one) => declared.has(one))) loose.push(at)
  }
  if (other.length > 0) {
    said.push(
      `${other.length} subfolders are the folder of no ${wanted.one}: ${saidInside(standing.folder, other)}`
    )
  }
  if (loose.length > 0) {
    const slug = holding[0]?.split("/")[1] ?? ""
    said.push(
      `${loose.length} ${wanted.many} are no part \`${slug}\` declares: ${saidInside(standing.folder, loose)}`
    )
  }
  return said
}
