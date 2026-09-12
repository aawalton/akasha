import {
  idsNaming,
  listedAt,
  slugsOfType,
  typeSlugById,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const PAGE = "page"

const PAGE_TYPE = "page-type"

const EXTENDS_TYPE = "extends-type"

export function kindsUnder(slug: string, given: string | Reading): ReadonlySet<string> {
  if (slug === PAGE) return new Set(slugsOfType(given, PAGE_TYPE))
  const under = new Set<string>([slug])
  const waiting = [slug]
  for (let at = 0; at < waiting.length; at += 1) {
    const one = waiting[at]
    if (one === undefined) continue
    const listed = listedAt(given, PAGE_TYPE, one)[0]
    if (listed === undefined) continue
    for (const id of idsNaming(given, listed.id, EXTENDS_TYPE)) {
      const said = typeSlugById(given, id)
      if (said === null || under.has(said)) continue
      under.add(said)
      waiting.push(said)
    }
  }
  return under
}
