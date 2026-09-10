import { overEveryText } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { reasonsFor } from "./no-unparsed-boundary-read.code-check.decision.code.ts"

export function noUnparsedBoundaryRead(root: string): readonly Judged[] {
  return overEveryText(root, reasonsFor)
}
