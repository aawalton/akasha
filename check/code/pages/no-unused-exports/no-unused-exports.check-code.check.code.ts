import { refusalsOver } from "akasha/check/code/pages/no-unused-exports/no-unused-exports.check-code.decision.code.ts"
import { input, TEXTS } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const noUnusedExports = input(TEXTS, refusalsOver)
