import {
  judgingEach,
  pageTypesFor,
  TEXTS,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import { found, indexesAt } from "./no-index-path-spelled.code-check.decision.code.ts"

export const noIndexPathSpelled = judgingEach(TEXTS, (given, shadow) =>
  found(indexesAt(shadow), pageTypesFor(shadow), given.path, given.text)
)
