import { reasonsFor } from "akasha/checks/code-checks/pages/no-unparsed-boundary-read/no-unparsed-boundary-read.code-check.decision.code.ts"
import { overEveryText } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"

export function noUnparsedBoundaryRead(root: string): readonly Judged[] {
  return overEveryText(root, reasonsFor)
}
