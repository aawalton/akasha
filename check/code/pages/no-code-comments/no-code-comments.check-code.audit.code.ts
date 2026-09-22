import { found } from "akasha/check/code/pages/no-code-comments/no-code-comments.check-code.decision.code.ts"
import {
  commitIn,
  overEachBody,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noCodeComments(root: string): readonly Judged[] {
  return overEachBody(commitIn(root), found)
}
