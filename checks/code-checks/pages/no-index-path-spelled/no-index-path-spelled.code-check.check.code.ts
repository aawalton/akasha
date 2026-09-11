import {
  found,
  indexesAt,
} from "akasha/checks/code-checks/pages/no-index-path-spelled/no-index-path-spelled.code-check.decision.code.ts"
import {
  judgingEach,
  pageTypesFor,
  TEXTS,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const noIndexPathSpelled = judgingEach(TEXTS, (given, shadow) =>
  found(indexesAt(shadow), pageTypesFor(shadow), given.path, given.text)
)
