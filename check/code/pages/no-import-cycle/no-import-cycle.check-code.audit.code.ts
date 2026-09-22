import { refusalsOver } from "akasha/check/code/pages/no-import-cycle/no-import-cycle.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noImportCycle(root: string): readonly Judged[] {
  const commit = commitIn(root)
  return refusalsOver(commit.paths, commit, commit.read)
}
