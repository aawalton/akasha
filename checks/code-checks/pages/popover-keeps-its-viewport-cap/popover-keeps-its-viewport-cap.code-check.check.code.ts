import {
  refusalsOver,
  tsxNamed,
} from "akasha/checks/code-checks/pages/popover-keeps-its-viewport-cap/popover-keeps-its-viewport-cap.code-check.decision.code.ts"
import { input, textsBy } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

const TSX_BODIES = textsBy("tsx bodies", tsxNamed)

export const popoverKeepsItsViewportCap = input(TSX_BODIES, refusalsOver)
