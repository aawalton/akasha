import {
  found,
  librariesIn,
} from "akasha/check/code/pages/no-class/no-class.check-code.decision.code.ts"
import {
  judgingEach,
  TEXTS,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const noClass = judgingEach(TEXTS, (given, shadow) =>
  found(librariesIn(shadow), given.path, given.text)
)
