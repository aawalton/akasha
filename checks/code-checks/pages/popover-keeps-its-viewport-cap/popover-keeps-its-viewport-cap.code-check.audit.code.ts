import { shadowAt } from "@akasha/pages/shadow"
import { everythingIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { refusalsOver } from "./popover-keeps-its-viewport-cap.code-check.decision.code.ts"

export function popoverKeepsItsViewportCap(root: string): readonly Judged[] {
  return refusalsOver(everythingIn(root), shadowAt(root))
}
