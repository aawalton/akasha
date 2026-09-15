import { basename, dirname } from "node:path"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { ofCollectionParts } from "akasha/check/code/pages/folder-matches-a-shape/modules/collection-parts/collection-parts.module.code.ts"

export function collectionPartsUnderTheirPlural(standing: Standing): readonly string[] {
  const named = basename(standing.folder)
  const wanted = standing.gathered(named)
  if (wanted.length === 0) {
    return [`it is named \`${named}\`, and no page type gathers its pages under that name`]
  }
  const above = standing.holds(dirname(standing.folder))
  const first = above[0]
  if (first === undefined) return ["the folder above holds no page of its own"]
  const naming = new Set<string>(standing.pages.flatMap((one) => standing.partOf(one)))
  const holder = above.find((one) => naming.has(one)) ?? first
  return ofCollectionParts(standing, holder, wanted)
}
