import {
  outsideBy,
  reasonsOf,
} from "akasha/check/code/pages/repository-is-written-by-a-change/repository-is-written-by-a-change.check-code.decision.code.ts"
import {
  everythingIn,
  overEveryIn,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function repositoryIsWrittenByAChange(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const change = everythingIn(root)
  return overEveryIn(change, outsideBy(shadow), reasonsOf(change, shadow))
}
