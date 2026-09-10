import { judgingEach, TEXTS } from "../../../modules/change-walking/change-walking.module.code.ts"
import { found, librariesIn } from "./no-class.code-check.decision.code.ts"

export const noClass = judgingEach(TEXTS, (given, shadow) =>
  found(librariesIn(shadow), given.path, given.text)
)
