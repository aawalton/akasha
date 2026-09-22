import { judgedIn } from "akasha/check/code/pages/no-tmp/no-tmp.check-code.decision.code.ts"
import {
  commitIn,
  overEachText,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noTmp(root: string): readonly Judged[] {
  const commit = commitIn(root)
  return overEachText(commit, (path, text) => judgedIn(path, text, commit))
}
