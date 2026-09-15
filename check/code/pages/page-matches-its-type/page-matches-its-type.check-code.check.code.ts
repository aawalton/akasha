import { refusalsOver } from "akasha/check/code/pages/page-matches-its-type/page-matches-its-type.check-code.decision.code.ts"
import {
  input,
  PAGES_WITH_ROWS,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const pageMatchesItsType = input(PAGES_WITH_ROWS, refusalsOver)
