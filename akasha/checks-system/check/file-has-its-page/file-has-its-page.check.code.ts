import {
  filePropertiesAt,
  pageTypesIn,
  pathsOf,
  valueIn,
} from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  indexIn,
  standingByPath,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { pageNamed } from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import { bodyOf } from "../../checking/checking.module.code.ts"
import type { Judged, Leaving } from "../../judging/judging.module.code.ts"

const INSIDE = "akasha/"

export const UNCLAIMED =
  "no page claims this file — a file no page claims is enumerated by nothing and audited by nothing"

export function unclaimedIn(leaving: Leaving): readonly string[] {
  const found: string[] = []
  for (const path of leaving.changed) {
    if (!path.startsWith(INSIDE)) continue
    if (leaving.at(path) === null) continue
    if (standingByPath(leaving.root, path).length > 0) continue
    found.push(path)
  }
  return found
}

export function claimedByTheChange(leaving: Leaving): ReadonlySet<string> {
  const index = indexIn(leaving.root)
  const pageTypes = pageTypesIn(index)
  const fileProperties = filePropertiesAt(index)
  const found = new Set<string>()
  for (const path of leaving.changed) {
    if (!pageNamed(path, pageTypes)) continue
    const bytes = leaving.at(path)
    if (bytes === null) continue
    const text = bodyOf({ root: leaving.root, path, bytes })
    if (text === null) continue
    const value = valueIn(text)
    if (value === null) continue
    for (const one of pathsOf(value, path, leaving.root, fileProperties)) found.add(one)
  }
  return found
}

export function fileHasItsPage(leaving: Leaving): readonly Judged[] {
  const left = unclaimedIn(leaving)
  if (left.length === 0) return []
  const claimed = claimedByTheChange(leaving)
  return left.filter((one) => !claimed.has(one)).map((path) => ({ path, reason: UNCLAIMED }))
}
