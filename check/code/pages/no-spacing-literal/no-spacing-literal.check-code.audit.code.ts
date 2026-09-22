import {
  found,
  passingIn,
  swiftNamed,
} from "akasha/check/code/pages/no-spacing-literal/no-spacing-literal.check-code.decision.code.ts"
import { commitIn, overEachIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noSpacingLiteral(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const passing = passingIn(commit)
  return overEachIn(commit, swiftNamed, (path, text) => found(passing, path, text))
}
