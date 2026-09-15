import { refusalsOver } from "akasha/check/code/pages/parts-list-is-sorted/parts-list-is-sorted.check-code.decision.code.ts"
import { everythingIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function partsListIsSorted(root: string): readonly Judged[] {
  return refusalsOver(everythingIn(root), shadowAt(root))
}
