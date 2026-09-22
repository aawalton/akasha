import { refusalsIn } from "akasha/check/code/pages/page-matches-its-type/page-matches-its-type.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function pageMatchesItsType(root: string): readonly Judged[] {
  return refusalsIn(commitIn(root))
}
