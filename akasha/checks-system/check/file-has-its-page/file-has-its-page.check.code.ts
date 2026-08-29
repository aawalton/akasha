import { standingByPath } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { shadowFor } from "../../../pages-system/indexes/index-shadow/index-shadow.module.code.ts"
import type { Judged, Leaving } from "../../judging/judging.module.code.ts"

const INSIDE = "akasha/"

export const UNCLAIMED =
  "no page claims this file — a file no page claims is enumerated by nothing and audited by nothing"

export function unclaimedIn(leaving: Leaving): readonly string[] {
  const cast = shadowFor(leaving)
  if ("refused" in cast) throw new Error(cast.refused)
  const found: string[] = []
  for (const path of leaving.changed) {
    if (!path.startsWith(INSIDE)) continue
    if (leaving.at(path) === null) continue
    if (standingByPath(cast.shadow.reading, path).length > 0) continue
    found.push(path)
  }
  return found
}

export function fileHasItsPage(leaving: Leaving): readonly Judged[] {
  return unclaimedIn(leaving).map((path) => ({ path, reason: UNCLAIMED }))
}
