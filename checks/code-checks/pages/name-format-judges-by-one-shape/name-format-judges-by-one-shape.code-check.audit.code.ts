import { refusalsOver } from "akasha/checks/code-checks/pages/name-format-judges-by-one-shape/name-format-judges-by-one-shape.code-check.decision.code.ts"
import { everythingIn } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function nameFormatJudgesByOneShape(root: string): readonly Judged[] {
  return refusalsOver(everythingIn(root), shadowAt(root))
}
