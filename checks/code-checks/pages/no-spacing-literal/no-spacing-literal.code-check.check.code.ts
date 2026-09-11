import {
  foundIn,
  swiftNamed,
} from "akasha/checks/code-checks/pages/no-spacing-literal/no-spacing-literal.code-check.decision.code.ts"
import {
  judgingEach,
  textsBy,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

const SWIFT_BODIES = textsBy("Swift bodies", swiftNamed)

export const noSpacingLiteral = judgingEach(SWIFT_BODIES, (given, shadow) =>
  foundIn(shadow, given.path, given.text)
)
