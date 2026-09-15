import { found } from "akasha/check/code/pages/no-code-comments/no-code-comments.check-code.decision.code.ts"
import { overEveryBody } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noCodeComments(root: string): readonly Judged[] {
  return overEveryBody(root, found)
}
