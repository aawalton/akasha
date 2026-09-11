import { refusalsIn } from "akasha/checks/code-checks/pages/no-re-export/no-re-export.code-check.decision.code.ts"
import {
  judgingEach,
  TEXTS,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const noReExport = judgingEach(TEXTS, (given) => refusalsIn(given.path, given.text))
