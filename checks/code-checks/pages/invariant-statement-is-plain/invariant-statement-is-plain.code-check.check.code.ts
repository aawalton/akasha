import type { Answering } from "@akasha/indexes/answering"
import type { Body } from "../../../modules/change-walking/change-walking.module.code.ts"
import {
  judgingEachAsync,
  overEachText,
  overEachTextAsync,
  TEXTS,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import { found, marked } from "./invariant-statement-is-plain.code-check.decision.code.ts"

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
