import {
  judgingEach,
  overEachText,
  TEXTS,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import { foundIn } from "./id-is-a-uuid-version-7.code-check.decision.code.ts"

export const reasonsIn = overEachText(foundIn)

export const idIsAUuidVersion7 = judgingEach(TEXTS, (given) => foundIn(given.path, given.text))
