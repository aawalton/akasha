import { refusalsAdded } from "akasha/checks/code-checks/pages/no-import-cycle/no-import-cycle.code-check.decision.code.ts"
import { input, TEXTS } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const noImportCycle = input(TEXTS, (change) => refusalsAdded(change))
