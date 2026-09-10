import { everythingIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { refusalsOver } from "./require-import-extension.code-check.decision.code.ts"

export function requireImportExtension(root: string): readonly Judged[] {
  return refusalsOver(everythingIn(root))
}
