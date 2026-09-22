import {
  pathsSearched,
  TYPED_KINDS,
} from "akasha/change/modules/tree-searching/tree-searching.module.code.ts"
import {
  CLASS,
  found,
  librariesIn,
} from "akasha/check/code/pages/no-class/no-class.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { typeScripted } from "akasha/code/body/modules/file-kind/file-kind.module.code.ts"

const ONE_THREAD = 1

export function noClass(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const under = librariesIn(commit)
  const said: Judged[] = []
  for (const path of pathsSearched(root, [CLASS], TYPED_KINDS, ONE_THREAD).toSorted()) {
    if (!typeScripted(path)) continue
    const text = commit.read(path)
    if (text === null) continue
    for (const reason of found(under, path, text)) said.push({ path, reason })
  }
  return said
}
