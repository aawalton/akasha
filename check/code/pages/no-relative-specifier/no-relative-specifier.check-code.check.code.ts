import { refusalsOver } from "akasha/check/code/pages/no-relative-specifier/no-relative-specifier.check-code.decision.code.ts"
import { input, TEXTS } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const noRelativeSpecifier = input(TEXTS, (change) => refusalsOver(change))
