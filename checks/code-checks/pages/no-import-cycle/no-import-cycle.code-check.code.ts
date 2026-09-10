import { input, TEXTS } from "../../../modules/change-walking/change-walking.module.code.ts"
import { refusalsOver } from "./no-import-cycle.code-check.decision.code.ts"

export const noImportCycle = input(TEXTS, (change, shadow) =>
  refusalsOver(change, shadow.index.importersOf)
)
