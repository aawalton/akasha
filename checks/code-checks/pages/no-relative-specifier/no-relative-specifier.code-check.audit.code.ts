import { everythingIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { refusalsOver } from "./no-relative-specifier.code-check.decision.code.ts"

export function noRelativeSpecifier(root: string): readonly Judged[] {
  return refusalsOver(everythingIn(root))
}
