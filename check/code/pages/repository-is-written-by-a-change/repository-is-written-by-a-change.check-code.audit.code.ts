import {
  outsideBy,
  reasonsBy,
} from "akasha/check/code/pages/repository-is-written-by-a-change/repository-is-written-by-a-change.check-code.decision.code.ts"
import {
  type Commit,
  commitIn,
  overEachIn,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

function refusalsFor(commit: Commit): readonly Judged[] {
  return overEachIn(commit, outsideBy(commit), reasonsBy(commit.read, commit))
}

export function repositoryIsWrittenByAChange(root: string): readonly Judged[] {
  return refusalsFor(commitIn(root))
}
