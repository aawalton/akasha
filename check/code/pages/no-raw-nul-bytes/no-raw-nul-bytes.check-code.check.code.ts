import {
  reasonsIn,
  UNEXEMPT,
} from "akasha/check/code/pages/no-raw-nul-bytes/no-raw-nul-bytes.check-code.decision.code.ts"
import { judgingEach } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const noRawNulBytes = judgingEach(UNEXEMPT, reasonsIn)
