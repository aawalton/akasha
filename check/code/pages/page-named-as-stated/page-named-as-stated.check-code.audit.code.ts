import {
  namedForAPage,
  reasonsFor,
} from "akasha/check/code/pages/page-named-as-stated/page-named-as-stated.check-code.decision.code.ts"
import {
  type Commit,
  commitIn,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

function refusalsIn(commit: Commit): readonly Judged[] {
  const heldInAFile = new Set(commit.index.fileKeysAt().keys())
  const said: Judged[] = []
  for (const path of commit.paths) {
    if (!namedForAPage(path, heldInAFile)) continue
    const body = commit.read(path)
    if (body === null) continue
    for (const reason of reasonsFor(path, body, heldInAFile)) said.push({ path, reason })
  }
  return said
}

export function pageNamedAsStated(root: string): readonly Judged[] {
  return refusalsIn(commitIn(root))
}
