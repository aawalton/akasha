import { sparingLately } from "akasha/check/code/pages/no-unused-exports/modules/recent-landing/recent-landing.module.code.ts"
import { refusalsOver } from "akasha/check/code/pages/no-unused-exports/no-unused-exports.check-code.decision.code.ts"
import { input, TEXTS } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function refusalsLeft(
  change: Change,
  shadow: Shadow,
  now: number = Date.now()
): readonly Judged[] {
  return sparingLately(change.root, refusalsOver(change, shadow), now)
}

export const noUnusedExports = input(TEXTS, refusalsLeft)
