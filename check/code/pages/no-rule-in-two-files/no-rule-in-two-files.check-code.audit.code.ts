import {
  reasonsIn,
  sayingOver,
} from "akasha/check/code/pages/no-rule-in-two-files/no-rule-in-two-files.check-code.decision.code.ts"
import {
  commitIn,
  overEachText,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noRuleInTwoFiles(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const every = sayingOver(commit)
  return overEachText(commit, (path, text) => reasonsIn(path, text, every))
}
