import { judgingOver } from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.code.ts"
import {
  ancestorsOf,
  groupedOver,
} from "akasha/check/code/pages/folder-matches-a-shape/modules/folder-grouping/folder-grouping.module.code.ts"
import { FILES, input } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  facingIn,
  generatedIn,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

const ROOT = ""

function foldersAbove(change: Change): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of change.changed) {
    for (const at of ancestorsOf(one)) found.add(at)
  }
  return found
}

export function foldersJudgedBy(change: Change): ReadonlySet<string> {
  const found = new Set<string>(foldersAbove(change))
  if (change.changed.length > 0) found.add(ROOT)
  return found
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const facing = facingIn(change.root, readingIn(change.root))
  const grouped = groupedOver(change, (path) => generatedIn(facing, path))
  const judging = judgingOver({ root: change.root, shadow, grouped })
  return judging.refusalsAt(foldersJudgedBy(change))
}

export const folderMatchesAShape = input(FILES, refusalsIn)
