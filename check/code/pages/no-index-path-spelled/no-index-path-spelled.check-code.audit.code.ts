import {
  found,
  indexAt,
} from "akasha/check/code/pages/no-index-path-spelled/no-index-path-spelled.check-code.decision.code.ts"
import {
  commitIn,
  overEachText,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noIndexPathSpelled(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const under = indexAt(commit)
  const pageTypes = commit.index.pageTypesIn()
  return overEachText(commit, (path, text) => found(under, pageTypes, path, text))
}
