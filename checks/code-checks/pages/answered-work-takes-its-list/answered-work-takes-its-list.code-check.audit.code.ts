import { foundIn } from "akasha/checks/code-checks/pages/answered-work-takes-its-list/answered-work-takes-its-list.code-check.decision.code.ts"
import { overEveryText } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"

export function answeredWorkTakesItsList(root: string): readonly Judged[] {
  return overEveryText(root, foundIn)
}
