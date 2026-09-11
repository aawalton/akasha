import { foundIn } from "akasha/checks/code-checks/pages/no-enum-or-namespace/no-enum-or-namespace.code-check.decision.code.ts"
import {
  judgingEach,
  TEXTS,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const noEnumOrNamespace = judgingEach(TEXTS, (given) => foundIn(given.path, given.text))
