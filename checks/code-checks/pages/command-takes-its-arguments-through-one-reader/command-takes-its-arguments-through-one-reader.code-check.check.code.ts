import { found } from "akasha/checks/code-checks/pages/command-takes-its-arguments-through-one-reader/command-takes-its-arguments-through-one-reader.code-check.decision.code.ts"
import type { Body } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import {
  judgingEach,
  overEachText,
  TEXTS,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const reasonsIn: (given: Body) => readonly string[] = overEachText(found)

export const commandTakesItsArgumentsThroughOneReader = judgingEach(TEXTS, (given) =>
  found(given.path, given.text)
)
