import { refusalsOver } from "akasha/checks/code-checks/pages/restatement-narrows-something/restatement-narrows-something.code-check.decision.code.ts"
import { input, PAGES } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const restatementNarrowsSomething = input(PAGES, refusalsOver)
