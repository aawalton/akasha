import {
  besideAt,
  found,
} from "akasha/checks/code-checks/pages/command-taking-two-words-is-tested-from-words/command-taking-two-words-is-tested-from-words.code-check.decision.code.ts"
import { overEveryText } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"

export function commandTakingTwoWordsIsTestedFromWords(root: string): readonly Judged[] {
  return overEveryText(root, (path, text) => found(path, text, besideAt(root, path)))
}
