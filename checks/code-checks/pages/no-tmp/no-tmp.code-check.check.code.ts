import { judgedIn } from "akasha/checks/code-checks/pages/no-tmp/no-tmp.code-check.decision.code.ts"
import {
  judgingEach,
  TEXTS,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const noTmp = judgingEach(TEXTS, (given, shadow) => judgedIn(given.path, given.text, shadow))
