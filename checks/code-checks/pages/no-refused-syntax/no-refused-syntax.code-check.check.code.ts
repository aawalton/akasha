import { refusalsOver } from "akasha/checks/code-checks/pages/no-refused-syntax/no-refused-syntax.code-check.decision.code.ts"
import { input, TEXTS } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const noRefusedSyntax = input(TEXTS, refusalsOver)
