import {
  besideAt,
  found,
} from "akasha/check/code/pages/command-taking-two-words-is-tested-from-words/command-taking-two-words-is-tested-from-words.check-code.decision.code.ts"
import { overEveryText } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function commandTakingTwoWordsIsTestedFromWords(root: string): readonly Judged[] {
  return overEveryText(root, (path, text) => found(path, text, besideAt(root, path)))
}
