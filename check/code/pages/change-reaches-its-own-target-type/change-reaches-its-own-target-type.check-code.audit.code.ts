import { judgedOver } from "akasha/check/code/pages/change-reaches-its-own-target-type/change-reaches-its-own-target-type.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function changeReachesItsOwnTargetType(root: string): readonly Judged[] {
  const commit = commitIn(root)
  return judgedOver(commit.paths, commit.read, commit)
}
