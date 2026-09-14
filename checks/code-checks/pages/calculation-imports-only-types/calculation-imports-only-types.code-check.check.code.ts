import {
  foundIn,
  runsFromText,
} from "akasha/checks/code-checks/pages/calculation-imports-only-types/calculation-imports-only-types.code-check.decision.code.ts"
import {
  judgingEach,
  textsBy,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

const RUN_FROM_TEXT = textsBy("calculations and the modules they fold in", runsFromText)

export const calculationImportsOnlyTypes = judgingEach(RUN_FROM_TEXT, (given) =>
  foundIn(given.path, given.text)
)
