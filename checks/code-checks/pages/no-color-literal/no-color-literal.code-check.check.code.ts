import { BODIES, judgingEach } from "../../../modules/change-walking/change-walking.module.code.ts"
import { foundIn } from "./no-color-literal.code-check.decision.code.ts"

export const noColorLiteral = judgingEach(BODIES, (given, shadow) =>
  foundIn(shadow, given.path, given.text)
)
