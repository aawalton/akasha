import { foundIn } from "akasha/checks/code-checks/pages/no-color-literal/no-color-literal.code-check.decision.code.ts"
import {
  BODIES,
  judgingEach,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const noColorLiteral = judgingEach(BODIES, (given, shadow) =>
  foundIn(shadow, given.path, given.text)
)
