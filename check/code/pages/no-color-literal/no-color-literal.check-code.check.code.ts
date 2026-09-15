import { foundIn } from "akasha/check/code/pages/no-color-literal/no-color-literal.check-code.decision.code.ts"
import {
  BODIES,
  judgingEach,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const noColorLiteral = judgingEach(BODIES, (given, shadow) =>
  foundIn(shadow, given.path, given.text)
)
