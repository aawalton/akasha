import { foundIn } from "akasha/check/code/pages/no-enum-or-namespace/no-enum-or-namespace.check-code.decision.code.ts"
import {
  judgingEach,
  TEXTS,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const noEnumOrNamespace = judgingEach(TEXTS, (given) => foundIn(given.path, given.text))
