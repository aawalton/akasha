import { refusalsIn } from "akasha/check/code/pages/no-re-export/no-re-export.check-code.decision.code.ts"
import {
  judgingEach,
  TEXTS,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const noReExport = judgingEach(TEXTS, (given) => refusalsIn(given.path, given.text))
