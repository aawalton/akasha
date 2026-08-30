import { standingByPath } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import type { Shadow } from "../../../pages-system/shadow/shadow.module.code.ts"
import type { Judged, Leaving } from "../../judging/judging.module.code.ts"

const INSIDE = "akasha/"

export const UNCLAIMED =
  "no page claims this file — a file no page claims is enumerated by nothing and audited by nothing"

export function unclaimedIn(leaving: Leaving, shadow: Shadow): readonly string[] {
  const found: string[] = []
  for (const path of leaving.changed) {
    if (!path.startsWith(INSIDE)) continue
    if (leaving.at(path) === null) continue
    if (standingByPath(shadow.reading, path).length > 0) continue
    found.push(path)
  }
  return found
}

export function fileHasItsPage(leaving: Leaving, shadow: Shadow): readonly Judged[] {
  return unclaimedIn(leaving, shadow).map((path) => ({ path, reason: UNCLAIMED }))
}
