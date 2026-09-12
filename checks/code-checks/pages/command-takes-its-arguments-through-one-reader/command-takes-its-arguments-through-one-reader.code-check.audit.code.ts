import { found } from "akasha/checks/code-checks/pages/command-takes-its-arguments-through-one-reader/command-takes-its-arguments-through-one-reader.code-check.decision.code.ts"
import { overEveryText } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"

export function commandTakesItsArgumentsThroughOneReader(root: string): readonly Judged[] {
  return overEveryText(root, found)
}
