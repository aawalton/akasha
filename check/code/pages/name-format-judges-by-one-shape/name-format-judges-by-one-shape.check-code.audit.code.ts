import { refusalsIn } from "akasha/check/code/pages/name-format-judges-by-one-shape/name-format-judges-by-one-shape.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function nameFormatJudgesByOneShape(root: string): readonly Judged[] {
  const commit = commitIn(root)
  return refusalsIn(commit.root, commit, commit.paths, commit.read)
}
