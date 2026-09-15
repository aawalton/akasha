import { refusalsOver } from "akasha/check/code/pages/relation-resolves/relation-resolves.check-code.decision.code.ts"
import {
  input,
  PAGES_WITH_ROWS,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const relationResolves = input(PAGES_WITH_ROWS, refusalsOver)
