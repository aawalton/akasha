import type { Change } from "@akasha/pages/change"
import type { Shadow } from "@akasha/pages/shadow"
import { FILES, judgingEach } from "../../../modules/change-walking/change-walking.module.code.ts"
import { claimingIn, unclaimedAt } from "./file-has-its-page.code-check.decision.code.ts"

export function unclaimedIn(change: Change, shadow: Shadow): readonly string[] {
  const claimed = claimingIn(shadow)
  const found: string[] = []
  for (const path of change.changed) {
    if (change.after(path) === null) continue
    if (claimed(path)) continue
    found.push(path)
  }
  return found
}

export const fileHasItsPage = judgingEach(FILES, (given, shadow) =>
  unclaimedAt(given.path, claimingIn(shadow))
)
