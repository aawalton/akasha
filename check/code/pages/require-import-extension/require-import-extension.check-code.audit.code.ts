import { refusalsOver } from "akasha/check/code/pages/require-import-extension/require-import-extension.check-code.decision.code.ts"
import { everythingIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function requireImportExtension(root: string): readonly Judged[] {
  return refusalsOver(everythingIn(root))
}
