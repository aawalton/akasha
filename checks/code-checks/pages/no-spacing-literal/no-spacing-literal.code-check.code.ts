import { judgingEach, textsBy } from "../../../modules/change-walking/change-walking.module.code.ts"
import { foundIn, swiftNamed } from "./no-spacing-literal.code-check.decision.code.ts"

const SWIFT_BODIES = textsBy("Swift bodies", swiftNamed)

export const noSpacingLiteral = judgingEach(SWIFT_BODIES, (given, shadow) =>
  foundIn(shadow, given.path, given.text)
)
