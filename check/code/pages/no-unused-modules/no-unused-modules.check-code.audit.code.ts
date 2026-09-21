import { refusalsOver } from "akasha/check/code/pages/no-unused-modules/no-unused-modules.check-code.decision.code.ts"
import { everythingIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function noUnusedModules(root: string, now: number = Date.now()): readonly Judged[] {
  return refusalsOver(everythingIn(root), shadowAt(root), now)
}
