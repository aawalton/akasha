import { refusalsIn } from "akasha/check/code/pages/module-sits-under-a-modules-folder/module-sits-under-a-modules-folder.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function moduleSitsUnderAModulesFolder(root: string): readonly Judged[] {
  const commit = commitIn(root)
  return refusalsIn(commit.paths, commit.read)
}
