import { valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { slugsIn, type Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const PAGE_TYPE = "page-type"

const EXTENDS = "extends"

const SLUG = "slug"

function saidIn(value: Value | null, key: string): string | null {
  if (value === null) return null
  const said = value[key]
  return typeof said === "string" && said !== "" ? said : null
}

function namedAbove(value: Value | null): readonly string[] {
  return value === null ? [] : slugsIn(value[EXTENDS])
}

export function listedAbove(
  given: string | Reading,
  pageOf?: (path: string) => Value | null
): ReadonlyMap<string, readonly string[]> {
  const above = new Map<string, string[]>()
  for (const one of valuesOfType(given, PAGE_TYPE)) {
    const value = pageOf === undefined ? one.value : pageOf(one.path)
    const slug = saidIn(value, SLUG)
    const named = namedAbove(value)
    if (slug === null || named.length === 0) continue
    const held = above.get(slug)
    if (held === undefined) above.set(slug, [...named])
    else for (const two of named) if (!held.includes(two)) held.push(two)
  }
  return above
}

export function kindsUnder(
  slug: string,
  given: string | Reading,
  pageOf?: (path: string) => Value | null
): ReadonlySet<string> {
  const above = listedAbove(given, pageOf)
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
