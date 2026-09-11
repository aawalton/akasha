import { found } from "akasha/checks/code-checks/pages/no-code-comments/no-code-comments.code-check.decision.code.ts"
import {
  BODIES,
  judgingEach,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const noCodeComments = judgingEach(BODIES, (given) => found(given.path, given.text))
