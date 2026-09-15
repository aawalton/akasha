import { sparingLately } from "akasha/check/code/pages/no-unused-exports/modules/recent-landing/recent-landing.module.code.ts"
import { refusalsOver } from "akasha/check/code/pages/no-unused-exports/no-unused-exports.check-code.decision.code.ts"
import { everythingIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function noUnusedExports(root: string, now: number = Date.now()): readonly Judged[] {
  return sparingLately(root, refusalsOver(everythingIn(root), shadowAt(root)), now)
}
