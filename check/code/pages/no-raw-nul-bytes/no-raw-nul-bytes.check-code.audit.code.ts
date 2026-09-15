import {
  reasonsIn,
  UNEXEMPT,
} from "akasha/check/code/pages/no-raw-nul-bytes/no-raw-nul-bytes.check-code.decision.code.ts"
import {
  everythingIn,
  judgingEach,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const walked = judgingEach(UNEXEMPT, reasonsIn)

export function noRawNulBytes(root: string): readonly Judged[] {
  return walked(everythingIn(root), shadowAt(root))
}
