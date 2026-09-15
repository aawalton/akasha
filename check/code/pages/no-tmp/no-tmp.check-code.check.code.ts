import { judgedIn } from "akasha/check/code/pages/no-tmp/no-tmp.check-code.decision.code.ts"
import {
  judgingEach,
  TEXTS,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const noTmp = judgingEach(TEXTS, (given, shadow) => judgedIn(given.path, given.text, shadow))
