import { foundIn } from "akasha/checks/code-checks/pages/no-enum-or-namespace/no-enum-or-namespace.code-check.decision.code.ts"
import { overEveryText } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"

export function noEnumOrNamespace(root: string): readonly Judged[] {
  return overEveryText(root, foundIn)
}
