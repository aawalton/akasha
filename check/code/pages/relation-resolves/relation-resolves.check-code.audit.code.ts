import {
  danglingIn,
  mortalityIn,
} from "akasha/check/code/pages/relation-resolves/relation-resolves.check-code.decision.code.ts"
import {
  type Commit,
  commitIn,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { rowsOver } from "akasha/page/modules/entries/page-entries.module.code.ts"
import { pageNamed } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

function refusalsIn(commit: Commit): readonly Judged[] {
  const pageTypes = commit.index.pageTypesIn()
  const known = commit.index.knownIn()
  const mortal = mortalityIn(commit, known)
  const said: Judged[] = []
  for (const path of commit.paths) {
    if (!pageNamed(path, pageTypes)) continue
    const value = commit.pageOf(path)
    if (value === null) continue
    const rowing = rowsOver(path, value, known.entriedIn(value), (at) => commit.read(at))
    said.push(...danglingIn(path, value, known, mortal, rowing))
  }
  return said
}

export function relationResolves(root: string): readonly Judged[] {
  return refusalsIn(commitIn(root))
}
