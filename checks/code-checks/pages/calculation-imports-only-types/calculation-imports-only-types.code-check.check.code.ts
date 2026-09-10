import {
  judgingEach,
  overEachText,
  textsBy,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import { foundIn, runsFromText } from "./calculation-imports-only-types.code-check.decision.code.ts"

export const reasonsIn = overEachText(foundIn)

const RUN_FROM_TEXT = textsBy("calculations and the modules they fold in", runsFromText)

export const calculationImportsOnlyTypes = judgingEach(RUN_FROM_TEXT, (given) =>
  foundIn(given.path, given.text)
)
