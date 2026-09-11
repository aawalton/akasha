import { foundIn } from "akasha/checks/code-checks/pages/no-method-signature/no-method-signature.code-check.decision.code.ts"
import {
  judgingEach,
  TEXTS,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const noMethodSignature = judgingEach(TEXTS, (given) => foundIn(given.path, given.text))
