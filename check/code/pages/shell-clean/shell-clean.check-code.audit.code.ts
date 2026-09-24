import {
  besideOver,
  refusalsAcross,
  shellNamed,
} from "akasha/check/code/pages/shell-clean/shell-clean.check-code.decision.code.ts"
import {
  type Commit,
  commitIn,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { carriedOver } from "akasha/check/modules/tool-faults/tool-faults.module.code.ts"

function refusalsFor(commit: Commit): readonly Judged[] {
  const carried = carriedOver(commit.paths, shellNamed, (one) => commit.read(one) !== null)
  if (carried.length === 0) return []
  const beside = besideOver(commit.index, commit.root, () => commit.paths, carried)
  return refusalsAcross(carried, beside, commit.bytes)
}

export function shellClean(root: string): readonly Judged[] {
  return refusalsFor(commitIn(root))
}
