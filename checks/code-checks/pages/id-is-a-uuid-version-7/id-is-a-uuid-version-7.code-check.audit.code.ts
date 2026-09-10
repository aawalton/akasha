import { overEveryText } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { foundIn } from "./id-is-a-uuid-version-7.code-check.decision.code.ts"

export function idIsAUuidVersion7(root: string): readonly Judged[] {
  return overEveryText(root, foundIn)
}
