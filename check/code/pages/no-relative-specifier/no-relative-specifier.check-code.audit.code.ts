import { refusalsIn } from "akasha/check/code/pages/no-relative-specifier/no-relative-specifier.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noRelativeSpecifier(root: string): readonly Judged[] {
  const commit = commitIn(root)
  return refusalsIn(commit.paths, commit.read)
}
