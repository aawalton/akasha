import { overEveryText } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { refusedIn } from "./types-file-runs-nothing.code-check.decision.code.ts"

export function typesFileRunsNothing(root: string): readonly Judged[] {
  return overEveryText(root, refusedIn)
}
