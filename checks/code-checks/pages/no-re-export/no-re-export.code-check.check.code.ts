import { judgingEach, TEXTS } from "../../../modules/change-walking/change-walking.module.code.ts"
import { refusalsIn } from "./no-re-export.code-check.decision.code.ts"

export const noReExport = judgingEach(TEXTS, (given) => refusalsIn(given.path, given.text))
