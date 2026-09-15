import { found } from "akasha/check/code/pages/no-code-comments/no-code-comments.check-code.decision.code.ts"
import {
  BODIES,
  judgingEach,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const noCodeComments = judgingEach(BODIES, (given) => found(given.path, given.text))
