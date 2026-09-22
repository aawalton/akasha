import { reasonsFor } from "akasha/check/code/pages/no-unparsed-boundary-read/no-unparsed-boundary-read.check-code.decision.code.ts"
import {
  commitIn,
  overEachText,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noUnparsedBoundaryRead(root: string): readonly Judged[] {
  return overEachText(commitIn(root), reasonsFor)
}
