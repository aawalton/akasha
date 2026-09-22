import {
  reasonsIn,
  tagsOf,
  tsxNamed,
} from "akasha/check/code/pages/popover-keeps-its-viewport-cap/popover-keeps-its-viewport-cap.check-code.decision.code.ts"
import {
  type Commit,
  commitIn,
  overEachIn,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

function refusalsFor(commit: Commit): readonly Judged[] {
  const tags = tagsOf(commit.root, commit.paths, commit.read)
  return overEachIn(commit, tsxNamed, (path, text) => reasonsIn(tags, path, text))
}

export function popoverKeepsItsViewportCap(root: string): readonly Judged[] {
  return refusalsFor(commitIn(root))
}
