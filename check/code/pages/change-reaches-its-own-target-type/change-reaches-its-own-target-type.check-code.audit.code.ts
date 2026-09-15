import { refusalsOver } from "akasha/check/code/pages/change-reaches-its-own-target-type/change-reaches-its-own-target-type.check-code.decision.code.ts"
import { everythingIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function changeReachesItsOwnTargetType(root: string): readonly Judged[] {
  return refusalsOver(everythingIn(root), shadowAt(root))
}
