import { refusalsOver } from "akasha/checks/code-checks/pages/page-matches-its-type/page-matches-its-type.code-check.decision.code.ts"
import { input, PAGES } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const pageMatchesItsType = input(PAGES, refusalsOver)
