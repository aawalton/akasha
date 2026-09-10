import { overEveryText } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { foundIn } from "./no-enum-or-namespace.code-check.decision.code.ts"

export function noEnumOrNamespace(root: string): readonly Judged[] {
  return overEveryText(root, foundIn)
}
