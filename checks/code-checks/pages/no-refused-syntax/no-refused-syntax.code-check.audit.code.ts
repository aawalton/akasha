import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"
import { everythingIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { refusalsOver } from "./no-refused-syntax.code-check.decision.code.ts"

export function noRefusedSyntax(root: string): readonly Judged[] {
  return refusalsOver(everythingIn(root), shadowAt(root))
}
