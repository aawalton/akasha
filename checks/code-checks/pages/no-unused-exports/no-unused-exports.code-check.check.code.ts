import { refusalsOver } from "akasha/checks/code-checks/pages/no-unused-exports/no-unused-exports.code-check.decision.code.ts"
import { input, TEXTS } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const noUnusedExports = input(TEXTS, refusalsOver)
