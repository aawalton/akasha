import {
  declaring,
  refusedIn,
} from "akasha/check/code/pages/types-file-runs-nothing/types-file-runs-nothing.check-code.decision.code.ts"
import {
  judgingEach,
  textsBy,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

const TYPES_FILES = textsBy("types files", declaring)

export const typesFileRunsNothing = judgingEach(TYPES_FILES, (given) =>
  refusedIn(given.path, given.text)
)
