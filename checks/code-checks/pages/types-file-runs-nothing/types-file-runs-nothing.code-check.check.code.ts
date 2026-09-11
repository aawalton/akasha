import {
  declaring,
  refusedIn,
} from "akasha/checks/code-checks/pages/types-file-runs-nothing/types-file-runs-nothing.code-check.decision.code.ts"
import {
  judgingEach,
  textsBy,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

const TYPES_FILES = textsBy("types files", declaring)

export const typesFileRunsNothing = judgingEach(TYPES_FILES, (given) =>
  refusedIn(given.path, given.text)
)
