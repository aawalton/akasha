import type { Change } from "@akasha/pages/change"
import type { Shadow } from "@akasha/pages/shadow"
import { FILES, judgingEach } from "../../../modules/change-walking/change-walking.module.code.ts"

export const UNCLAIMED =
  "no page claims this file — a move repoints nothing to it and its page's deletion leaves it behind"

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
