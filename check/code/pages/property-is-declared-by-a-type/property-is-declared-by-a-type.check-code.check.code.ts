import { refusalsOver } from "akasha/check/code/pages/property-is-declared-by-a-type/property-is-declared-by-a-type.check-code.decision.code.ts"
import { input, PAGES } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const propertyIsDeclaredByAType = input(PAGES, refusalsOver)
