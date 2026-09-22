import { refusalsIn } from "akasha/check/code/pages/no-re-export/no-re-export.check-code.decision.code.ts"
import {
  commitIn,
  overEachText,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noReExport(root: string): readonly Judged[] {
  return overEachText(commitIn(root), refusalsIn)
}
