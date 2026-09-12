import {
  besideAt,
  found,
} from "akasha/checks/code-checks/pages/command-taking-two-words-is-tested-from-words/command-taking-two-words-is-tested-from-words.code-check.decision.code.ts"
import type { Body } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import {
  bodyOf,
  judgingEach,
  TEXTS,
  textNamed,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export function reasonsIn(given: Body): readonly string[] {
  if (!textNamed(given.path)) return []
  return found(given.path, bodyOf(given), besideAt(given.root, given.path))
}

export const commandTakingTwoWordsIsTestedFromWords = judgingEach(TEXTS, (given) =>
  found(given.path, given.text, besideAt(given.root, given.path))
)
