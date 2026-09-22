import {
  found,
  reaching,
} from "akasha/check/code/pages/command-takes-its-arguments-through-one-reader/command-takes-its-arguments-through-one-reader.check-code.decision.code.ts"
import {
  commitIn,
  overEachText,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function commandTakesItsArgumentsThroughOneReader(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const reach = reaching(commit.read)
  return overEachText(commit, (path, text) => found(path, text, reach))
}
