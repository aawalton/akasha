import {
  refusalsAcross,
  swiftNamed,
} from "akasha/check/code/pages/swift-parses/swift-parses.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { carriedOver } from "akasha/check/modules/tool-faults/tool-faults.module.code.ts"

export function swiftParses(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const carried = carriedOver(commit.paths, swiftNamed, (one) => commit.read(one) !== null)
  return refusalsAcross(carried, commit.bytes)
}
