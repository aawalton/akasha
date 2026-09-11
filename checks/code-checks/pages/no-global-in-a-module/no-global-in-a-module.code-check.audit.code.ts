import {
  moduleAt,
  reasonsIn,
} from "akasha/checks/code-checks/pages/no-global-in-a-module/no-global-in-a-module.code-check.decision.code.ts"
import { overEveryText } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"

export function noGlobalInAModule(root: string): readonly Judged[] {
  return overEveryText(root, (path, text) => (moduleAt(path) ? reasonsIn(path, text) : []))
}
