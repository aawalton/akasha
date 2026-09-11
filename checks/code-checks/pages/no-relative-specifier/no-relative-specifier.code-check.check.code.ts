import { refusalsOver } from "akasha/checks/code-checks/pages/no-relative-specifier/no-relative-specifier.code-check.decision.code.ts"
import { input, TEXTS } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const noRelativeSpecifier = input(TEXTS, (change) => refusalsOver(change))
