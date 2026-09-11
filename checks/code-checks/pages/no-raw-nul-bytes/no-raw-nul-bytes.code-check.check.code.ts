import { judgedIn } from "akasha/checks/code-checks/pages/no-raw-nul-bytes/no-raw-nul-bytes.code-check.decision.code.ts"
import {
  FILES,
  judgingEach,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const noRawNulBytes = judgingEach(FILES, judgedIn)
