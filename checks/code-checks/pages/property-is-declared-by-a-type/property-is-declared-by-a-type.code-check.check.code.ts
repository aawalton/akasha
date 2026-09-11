import { refusalsOver } from "akasha/checks/code-checks/pages/property-is-declared-by-a-type/property-is-declared-by-a-type.code-check.decision.code.ts"
import { input, PAGES } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const propertyIsDeclaredByAType = input(PAGES, refusalsOver)
