import { judgingOver } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-matches-a-shape.code-check.decision.code.ts"
import {
  type Grouped,
  groupedOver,
} from "akasha/checks/code-checks/pages/folder-matches-a-shape/modules/folder-grouping/folder-grouping.module.code.ts"
import {
  everythingIn,
  textIn,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

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
  const grouped = groupedOver(shadow.index, change)
  const judging = judgingOver({
    root,
    shadow,
    grouped,
    textAt: (path) => textIn(change, path),
  })
  return judging.refusalsAt(everyFolderIn(grouped))
}
