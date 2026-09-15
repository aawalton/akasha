import { found } from "akasha/check/code/pages/invariant-statement-is-plain/invariant-statement-is-plain.check-code.decision.code.ts"
import {
  judgingEachAsync,
  TEXTS,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const invariantStatementIsPlain = judgingEachAsync(TEXTS, (given, shadow) =>
  found(given.root, given.path, given.text, shadow.index)
)
