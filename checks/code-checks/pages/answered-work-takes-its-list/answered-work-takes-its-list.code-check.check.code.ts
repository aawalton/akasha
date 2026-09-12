import { foundIn } from "akasha/checks/code-checks/pages/answered-work-takes-its-list/answered-work-takes-its-list.code-check.decision.code.ts"
import {
  judgingEach,
  TEXTS,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const answeredWorkTakesItsList = judgingEach(TEXTS, (given) =>
  foundIn(given.path, given.text)
)
