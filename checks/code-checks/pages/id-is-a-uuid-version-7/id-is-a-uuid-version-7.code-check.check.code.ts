import { foundIn } from "akasha/checks/code-checks/pages/id-is-a-uuid-version-7/id-is-a-uuid-version-7.code-check.decision.code.ts"
import {
  judgingEach,
  overEachText,
  TEXTS,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const reasonsIn = overEachText(foundIn)

export const idIsAUuidVersion7 = judgingEach(TEXTS, (given) => foundIn(given.path, given.text))
