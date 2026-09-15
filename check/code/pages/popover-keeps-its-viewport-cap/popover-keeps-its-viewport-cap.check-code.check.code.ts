import {
  refusalsOver,
  tsxNamed,
} from "akasha/check/code/pages/popover-keeps-its-viewport-cap/popover-keeps-its-viewport-cap.check-code.decision.code.ts"
import { input, textsBy } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

const TSX_BODIES = textsBy("tsx bodies", tsxNamed)

export const popoverKeepsItsViewportCap = input(TSX_BODIES, refusalsOver)
