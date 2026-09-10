import { overEveryBody } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { found } from "./no-code-comments.code-check.decision.code.ts"

export function noCodeComments(root: string): readonly Judged[] {
  return overEveryBody(root, found)
}
