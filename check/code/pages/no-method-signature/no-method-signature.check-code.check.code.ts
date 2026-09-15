import { foundIn } from "akasha/check/code/pages/no-method-signature/no-method-signature.check-code.decision.code.ts"
import {
  judgingEach,
  TEXTS,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const noMethodSignature = judgingEach(TEXTS, (given) => foundIn(given.path, given.text))
