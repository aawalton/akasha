import { refusalsOver } from "akasha/check/code/pages/no-rule-in-two-files/no-rule-in-two-files.check-code.decision.code.ts"
import { input, TEXTS } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const noRuleInTwoFiles = input(TEXTS, (change, shadow) => refusalsOver(change, shadow))
