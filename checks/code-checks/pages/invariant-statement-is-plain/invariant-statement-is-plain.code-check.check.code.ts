import { found } from "akasha/checks/code-checks/pages/invariant-statement-is-plain/invariant-statement-is-plain.code-check.decision.code.ts"
import {
  judgingEachAsync,
  TEXTS,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const invariantStatementIsPlain = judgingEachAsync(TEXTS, (given, shadow) =>
  found(given.root, given.path, given.text, shadow.index)
)
