import { judgingOver } from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.code.ts"
import {
  type Grouped,
  groupedOver,
} from "akasha/check/code/pages/folder-matches-a-shape/modules/folder-grouping/folder-grouping.module.code.ts"
import { everythingIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  facingOn,
  generatedIn,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const ROOT = ""

export function everyFolderIn(grouped: Grouped): readonly string[] {
  const found = [ROOT]
  const left = [ROOT]
  while (left.length > 0) {
    const at = left.pop()
    if (at === undefined) continue
    for (const one of grouped.foldersIn(at)) {
      found.push(one)
      left.push(one)
    }
  }
  return found
}

export function folderMatchesAShape(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const change = everythingIn(root)
  const facing = facingOn(root)
  const grouped = groupedOver(change, (path) => generatedIn(facing, path))
  const judging = judgingOver({ root, shadow, grouped })
  return judging.refusalsAt(everyFolderIn(grouped))
}
