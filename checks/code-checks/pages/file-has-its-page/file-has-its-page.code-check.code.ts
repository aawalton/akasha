import type { Change } from "@akasha/pages-system/change"
import type { Shadow } from "@akasha/pages-system/shadow"
import { FILES, judgingEach } from "../../../modules/change-walking/change-walking.module.code.ts"

export const UNCLAIMED =
  "no page claims this file — a file no page claims is enumerated by nothing and audited by nothing"

function unclaimedAt(path: string, shadow: Shadow): readonly string[] {
  if (shadow.index.listedByPath(path).length > 0) return []
  return [UNCLAIMED]
}

export function unclaimedIn(change: Change, shadow: Shadow): readonly string[] {
  const found: string[] = []
  for (const path of change.changed) {
    if (change.after(path) === null) continue
    if (unclaimedAt(path, shadow).length === 0) continue
    found.push(path)
  }
  return found
}

export const fileHasItsPage = judgingEach(FILES, (given, shadow) => unclaimedAt(given.path, shadow))
