import {
  found,
  librariesIn,
} from "akasha/checks/code-checks/pages/no-class/no-class.code-check.decision.code.ts"
import {
  judgingEach,
  TEXTS,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const noClass = judgingEach(TEXTS, (given, shadow) =>
  found(librariesIn(shadow), given.path, given.text)
)
