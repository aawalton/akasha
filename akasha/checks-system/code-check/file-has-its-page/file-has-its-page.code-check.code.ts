import type { Change } from "../../../pages-system/change/change.module.code.ts"
import { standingByPathAnswered } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import type { Shadow } from "../../../pages-system/shadow/shadow.module.code.ts"
import { FILES, judgingEach } from "../../change-walking/change-walking.module.code.ts"

const INSIDE = "akasha/"

export const UNCLAIMED =
  "no page claims this file — a file no page claims is enumerated by nothing and audited by nothing"

function unclaimedAt(path: string, shadow: Shadow): readonly string[] {
  if (!path.startsWith(INSIDE)) return []
  if (standingByPathAnswered(shadow.reading, path).length > 0) return []
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
