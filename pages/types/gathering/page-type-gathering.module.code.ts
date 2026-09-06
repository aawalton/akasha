import { valuesOfType } from "../../indexes/reading/index-reading.module.code.ts"
import type { Reading } from "../../indexes/shape/index-shape.module.code.ts"
import { slugsIn, textAt, type Value } from "../../value/page-value.module.code.ts"

const PAGE_TYPE = "page-type"

const EXTENDS = "extendsSlug"

const SLUG = "slug"

const TYPE_SLUG = "pageTypeSlug"

// A page type is a page of any type reaching `page-type` by extending, so the types are gathered out
// from `page-type` rather than read off that one slug. The walk repeats until nothing joins, because
// a type reaching `page-type` through another type is filed among the pages of that other type.
export function typeSlugsIn(given: string | Reading): ReadonlySet<string> {
  const seen = new Set<string>([PAGE_TYPE])
  for (;;) {
    let grew = false
    for (const one of [...seen]) {
      for (const held of valuesOfType(given, one)) {
        const slug = textAt(held.value, SLUG)
        if (slug === null || seen.has(slug)) continue
        if (!slugsIn(held.value[EXTENDS]).some((each) => seen.has(each))) continue
        seen.add(slug)
        grew = true
      }
    }
    if (!grew) return seen
  }
}

export function typeValuesIn(
  given: string | Reading,
  among: ReadonlySet<string>
): readonly Value[] {
  const found: Value[] = []
  for (const one of among) {
    for (const held of valuesOfType(given, one)) found.push(held.value)
  }
  return found
}

// A value stands as a page type where the type that value is stands among the types named, rather
// than where that type is `page-type` itself.
export function typesAmong(
  values: Iterable<Value>,
  among: ReadonlySet<string> = new Set([PAGE_TYPE])
): ReadonlyMap<string, Value> {
  const found = new Map<string, Value>()
  for (const value of values) {
    const said = textAt(value, TYPE_SLUG)
    if (said === null || !among.has(said)) continue
    const slug = textAt(value, SLUG)
    if (slug !== null) found.set(slug, value)
  }
  return found
}
