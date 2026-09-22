import { judgingOver } from "akasha/check/code/pages/no-refused-syntax/no-refused-syntax.check-code.decision.code.ts"
import {
  commitIn,
  overEachText,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noRefusedSyntax(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const carrying = { paths: commit.paths, read: commit.read }
  return overEachText(commit, judgingOver(commit.root, commit, carrying))
}
