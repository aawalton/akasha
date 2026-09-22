import { refusalsOver } from "akasha/check/code/pages/global-is-set-before-it-is-read/global-is-set-before-it-is-read.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function globalIsSetBeforeItIsRead(root: string): readonly Judged[] {
  const commit = commitIn(root)
  return refusalsOver(commit.paths, commit, commit.read)
}
