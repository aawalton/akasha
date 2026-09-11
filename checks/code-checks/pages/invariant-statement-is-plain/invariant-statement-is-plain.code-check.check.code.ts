import {
  found,
  marked,
} from "akasha/checks/code-checks/pages/invariant-statement-is-plain/invariant-statement-is-plain.code-check.decision.code.ts"
import type { Body } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import {
  judgingEachAsync,
  overEachText,
  overEachTextAsync,
  TEXTS,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Answering } from "akasha/pages/indexes/answering/index-answering.module.code.ts"

export const reasonsIn = overEachText(marked)

export function reasonsShaped(
  root: string,
  index: Answering
): (given: Body) => Promise<readonly string[]> {
  return overEachTextAsync((path, text) => found(root, path, text, index))
}

export const invariantStatementIsPlain = judgingEachAsync(TEXTS, (given, shadow) =>
  found(given.root, given.path, given.text, shadow.index)
)
