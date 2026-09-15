import {
  foundIn,
  runsFromText,
} from "akasha/check/code/pages/calculation-imports-only-types/calculation-imports-only-types.check-code.decision.code.ts"
import {
  judgingEach,
  textsBy,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

const RUN_FROM_TEXT = textsBy("calculations and the modules they fold in", runsFromText)

export const calculationImportsOnlyTypes = judgingEach(RUN_FROM_TEXT, (given) =>
  foundIn(given.path, given.text)
)
