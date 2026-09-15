import {
  foundIn,
  swiftNamed,
} from "akasha/check/code/pages/no-spacing-literal/no-spacing-literal.check-code.decision.code.ts"
import {
  judgingEach,
  textsBy,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

const SWIFT_BODIES = textsBy("Swift bodies", swiftNamed)

export const noSpacingLiteral = judgingEach(SWIFT_BODIES, (given, shadow) =>
  foundIn(shadow, given.path, given.text)
)
