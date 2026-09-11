import { refusalsOver } from "akasha/checks/code-checks/pages/no-rule-in-two-files/no-rule-in-two-files.code-check.decision.code.ts"
import { input, TEXTS } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const noRuleInTwoFiles = input(TEXTS, refusalsOver)
