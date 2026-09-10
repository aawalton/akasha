import { shadowAt } from "@akasha/pages/shadow"
import { everythingIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { refusalsOver } from "./name-format-judges-by-one-shape.code-check.decision.code.ts"

export function nameFormatJudgesByOneShape(root: string): readonly Judged[] {
  return refusalsOver(everythingIn(root), shadowAt(root))
}
