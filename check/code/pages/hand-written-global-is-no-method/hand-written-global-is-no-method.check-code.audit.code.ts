import { refusalsOver } from "akasha/check/code/pages/hand-written-global-is-no-method/hand-written-global-is-no-method.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function handWrittenGlobalIsNoMethod(root: string): readonly Judged[] {
  const commit = commitIn(root)
  return refusalsOver(commit, commit.read)
}
