import { everythingIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { refusalsOver } from "./extension-host-reaches-no-bun-code.code-check.decision.code.ts"

export function extensionHostReachesNoBunCode(root: string): readonly Judged[] {
  const change = everythingIn(root)
  return refusalsOver(change, change.changed)
}
