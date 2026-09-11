import { refusalsOver } from "akasha/checks/code-checks/pages/relation-resolves/relation-resolves.code-check.decision.code.ts"
import { input, PAGES } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const relationResolves = input(PAGES, refusalsOver)
