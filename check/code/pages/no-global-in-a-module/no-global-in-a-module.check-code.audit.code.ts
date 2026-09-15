import {
  moduleAt,
  reasonsIn,
} from "akasha/check/code/pages/no-global-in-a-module/no-global-in-a-module.check-code.decision.code.ts"
import { overEveryText } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noGlobalInAModule(root: string): readonly Judged[] {
  return overEveryText(root, (path, text) => (moduleAt(path) ? reasonsIn(path, text) : []))
}
