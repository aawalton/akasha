import { refusalsOver } from "akasha/check/code/pages/module-sits-under-a-modules-folder/module-sits-under-a-modules-folder.check-code.decision.code.ts"
import { everythingIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function moduleSitsUnderAModulesFolder(root: string): readonly Judged[] {
  return refusalsOver(everythingIn(root))
}
