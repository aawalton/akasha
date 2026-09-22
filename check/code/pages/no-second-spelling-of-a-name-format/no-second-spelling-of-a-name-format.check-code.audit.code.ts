import {
  everyShapeOver,
  reasonsIn,
} from "akasha/check/code/pages/no-second-spelling-of-a-name-format/no-second-spelling-of-a-name-format.check-code.decision.code.ts"
import {
  commitIn,
  overEachText,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noSecondSpellingOfANameFormat(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const every = everyShapeOver(commit.paths, commit.read, commit)
  return overEachText(commit, (path, text) => reasonsIn(path, text, every))
}
