import {
  slugsOfType,
  valuesOfType,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { slugsIn } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const PAGE = "page"

const PAGE_TYPE = "page-type"

const EXTENDS = "extends"

const SLUG = "slug"

function listedAbove(given: string | Reading): ReadonlyMap<string, readonly string[]> {
  const above = new Map<string, string[]>()
  for (const one of valuesOfType(given, PAGE_TYPE)) {
    const said = one.value[SLUG]
    const named = slugsIn(one.value[EXTENDS])
    if (typeof said !== "string" || said === "" || named.length === 0) continue
    const held = above.get(said)
    if (held === undefined) above.set(said, [...named])
    else for (const two of named) if (!held.includes(two)) held.push(two)
  }
  return above
}

export function kindsUnder(slug: string, given: string | Reading): ReadonlySet<string> {
  if (slug === PAGE) return new Set(slugsOfType(given, PAGE_TYPE))
  const above = listedAbove(given)
  const under = new Set<string>([slug])
  for (;;) {
    let grew = false
    for (const [held, parents] of above) {
      if (!under.has(held) && parents.some((one) => under.has(one))) {
        under.add(held)
        grew = true
      }
    }
    if (!grew) return under
  }
}
