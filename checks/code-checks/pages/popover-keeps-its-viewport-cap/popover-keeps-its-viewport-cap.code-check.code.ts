import { input, textsBy } from "../../../modules/change-walking/change-walking.module.code.ts"
import {
  refusalsOver,
  tsxNamed,
} from "./popover-keeps-its-viewport-cap.code-check.decision.code.ts"

const TSX_BODIES = textsBy("tsx bodies", tsxNamed)

export const popoverKeepsItsViewportCap = input(TSX_BODIES, refusalsOver)
