import { refusalsOver } from "akasha/check/code/pages/no-relative-specifier/no-relative-specifier.check-code.decision.code.ts"
import { everythingIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function noRelativeSpecifier(root: string): readonly Judged[] {
  return refusalsOver(everythingIn(root))
}
