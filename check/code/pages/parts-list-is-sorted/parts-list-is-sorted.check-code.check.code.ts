import { refusalsOver } from "akasha/check/code/pages/parts-list-is-sorted/parts-list-is-sorted.check-code.decision.code.ts"
import { input, PAGES } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const partsListIsSorted = input(PAGES, refusalsOver)
