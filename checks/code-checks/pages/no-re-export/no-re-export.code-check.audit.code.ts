import { overEveryText } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { refusalsIn } from "./no-re-export.code-check.decision.code.ts"

export function noReExport(root: string): readonly Judged[] {
  return overEveryText(root, refusalsIn)
}
