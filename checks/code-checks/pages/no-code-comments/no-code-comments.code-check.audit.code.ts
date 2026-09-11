import { found } from "akasha/checks/code-checks/pages/no-code-comments/no-code-comments.code-check.decision.code.ts"
import { overEveryBody } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"

export function noCodeComments(root: string): readonly Judged[] {
  return overEveryBody(root, found)
}
