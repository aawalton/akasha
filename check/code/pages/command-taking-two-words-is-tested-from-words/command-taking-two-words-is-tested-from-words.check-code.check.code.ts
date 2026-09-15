import {
  besideAt,
  found,
} from "akasha/check/code/pages/command-taking-two-words-is-tested-from-words/command-taking-two-words-is-tested-from-words.check-code.decision.code.ts"
import {
  judgingEach,
  TEXTS,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const commandTakingTwoWordsIsTestedFromWords = judgingEach(TEXTS, (given) =>
  found(given.path, given.text, besideAt(given.root, given.path))
)
