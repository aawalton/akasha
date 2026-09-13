import { refusalsOver } from "akasha/checks/code-checks/pages/change-reaches-its-own-target-type/change-reaches-its-own-target-type.code-check.decision.code.ts"
import { everythingIn } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/modules/shadow/shadow.module.code.ts"

export function changeReachesItsOwnTargetType(root: string): readonly Judged[] {
  return refusalsOver(everythingIn(root), shadowAt(root))
}
