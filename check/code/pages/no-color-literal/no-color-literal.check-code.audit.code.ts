import {
  found,
  passingIn,
} from "akasha/check/code/pages/no-color-literal/no-color-literal.check-code.decision.code.ts"
import {
  commitIn,
  overEachBody,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { pageNamed } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

export function noColorLiteral(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const passing = passingIn(commit)
  const pageTypes = commit.index.pageTypesIn()
  return overEachBody(commit, (path, text) =>
    pageNamed(path, pageTypes) ? [] : found(passing, path, text)
  )
}
