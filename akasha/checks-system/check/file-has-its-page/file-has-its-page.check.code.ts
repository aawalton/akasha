import { standingByPath } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import type { Shadow } from "../../../pages-system/shadow/shadow.module.code.ts"
import type { Judged, Change } from "../../judging/judging.module.code.ts"

const INSIDE = "akasha/"

export const UNCLAIMED =
  "no page claims this file — a file no page claims is enumerated by nothing and audited by nothing"

export function unclaimedIn(change: Change, shadow: Shadow): readonly string[] {
  const found: string[] = []
  for (const path of change.changed) {
    if (!path.startsWith(INSIDE)) continue
    if (change.after(path) === null) continue
    if (standingByPath(shadow.reading, path).length > 0) continue
    found.push(path)
  }
  return found
}

export function fileHasItsPage(change: Change, shadow: Shadow): readonly Judged[] {
  return unclaimedIn(change, shadow).map((path) => ({ path, reason: UNCLAIMED }))
}
