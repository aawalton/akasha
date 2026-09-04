import { everyOfType } from "@akasha/indexes"
import type { Reading } from "@akasha/indexes/shape"
import { slugsIn, type Value } from "../../pages/value/page-value.module.code.ts"

const PAGE_TYPE = "page-type"

const EXTENDS = "extendsSlug"

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
  given: Reading,
  pageOf: (path: string) => Value | null
): ReadonlyMap<string, readonly string[]> {
  const above = new Map<string, readonly string[]>()
  for (const one of everyOfType(given, PAGE_TYPE)) {
    const value = pageOf(one.path)
    const slug = saidIn(value, SLUG)
    const named = namedAbove(value)
    if (slug !== null && named.length > 0) above.set(slug, named)
  }
  return above
}

export function kindsUnder(
  slug: string,
  given: Reading,
  pageOf: (path: string) => Value | null
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
