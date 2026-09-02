import { everyOfType } from "@akasha/indexes"
import type { Reading } from "@akasha/indexes/shape"
import { slugOf, type Value } from "../../pages/value/page-value.module.code.ts"

const PAGE_TYPE = "page-type"

const EXTENDS = "extendsSlug"

const SLUG = "slug"

function saidIn(value: Value | null, key: string): string | null {
  if (value === null) return null
  const said = value[key]
  return typeof said === "string" && said !== "" ? said : null
}

export function listedAbove(
  given: Reading,
  pageOf: (path: string) => Value | null
): ReadonlyMap<string, string> {
  const above = new Map<string, string>()
  for (const one of everyOfType(given, PAGE_TYPE)) {
    const value = pageOf(one.path)
    const slug = saidIn(value, SLUG)
    const said = saidIn(value, EXTENDS)
    if (slug !== null && said !== null) above.set(slug, slugOf(said))
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
    for (const [held, parent] of above) {
      if (!under.has(held) && under.has(parent)) {
        under.add(held)
        grew = true
      }
    }
    if (!grew) return under
  }
}
