import {
  found,
  indexAt,
} from "akasha/check/code/pages/no-index-path-spelled/no-index-path-spelled.check-code.decision.code.ts"
import {
  judgingEach,
  pageTypesFor,
  TEXTS,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const noIndexPathSpelled = judgingEach(TEXTS, (given, shadow) =>
  found(indexAt(shadow), pageTypesFor(shadow), given.path, given.text)
)
