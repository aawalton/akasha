import { found } from "akasha/check/code/pages/change-is-reached-through-a-runner/change-is-reached-through-a-runner.check-code.decision.code.ts"
import {
  commitIn,
  overEachText,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function changeIsReachedThroughARunner(root: string): readonly Judged[] {
  return overEachText(commitIn(root), found)
}
