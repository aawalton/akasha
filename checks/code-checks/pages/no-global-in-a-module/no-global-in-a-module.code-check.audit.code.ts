import { overEveryText } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { moduleAt, reasonsIn } from "./no-global-in-a-module.code-check.decision.code.ts"

export function noGlobalInAModule(root: string): readonly Judged[] {
  return overEveryText(root, (path, text) => (moduleAt(path) ? reasonsIn(path, text) : []))
}
