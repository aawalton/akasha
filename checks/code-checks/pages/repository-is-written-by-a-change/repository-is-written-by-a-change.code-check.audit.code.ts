import {
  outsideBy,
  reasonsOf,
} from "akasha/checks/code-checks/pages/repository-is-written-by-a-change/repository-is-written-by-a-change.code-check.decision.code.ts"
import { overEveryNamed } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function repositoryIsWrittenByAChange(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  return overEveryNamed(root, outsideBy(shadow), reasonsOf(root, shadow))
}
