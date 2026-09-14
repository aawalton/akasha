import {
  besideAt,
  found,
} from "akasha/checks/code-checks/pages/command-taking-two-words-is-tested-from-words/command-taking-two-words-is-tested-from-words.code-check.decision.code.ts"
import {
  judgingEach,
  TEXTS,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const commandTakingTwoWordsIsTestedFromWords = judgingEach(TEXTS, (given) =>
  found(given.path, given.text, besideAt(given.root, given.path))
)
