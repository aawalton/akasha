import { refusalsOver } from "akasha/checks/code-checks/pages/parts-list-is-sorted/parts-list-is-sorted.code-check.decision.code.ts"
import { input, PAGES } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const partsListIsSorted = input(PAGES, refusalsOver)
