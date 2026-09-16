import { refusalsAdded } from "akasha/check/code/pages/no-import-cycle/no-import-cycle.check-code.decision.code.ts"
import { input, TEXTS } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const noImportCycle = input(TEXTS, (change, shadow) => refusalsAdded(change, shadow))
