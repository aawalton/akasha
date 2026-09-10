import { shadowAt } from "@akasha/pages/shadow"
import { everythingIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { refusalsOver } from "./phone-number-is-e164.code-check.decision.code.ts"

export function phoneNumberIsE164(root: string): readonly Judged[] {
  return refusalsOver(everythingIn(root), shadowAt(root))
}
