import { shadowAt } from "@akasha/pages/shadow"
import { everythingIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { refusalsOver } from "./page-property-has-its-file.code-check.decision.code.ts"

export function pagePropertyHasItsFile(root: string): readonly Judged[] {
  return refusalsOver(everythingIn(root), shadowAt(root))
}
