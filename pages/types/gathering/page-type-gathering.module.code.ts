import { heldOnce, valuesOfType } from "../../indexes/reading/index-reading.module.code.ts"
import type { Reading } from "../../indexes/shape/index-shape.module.code.ts"
import { slugsIn, textAt, type Value } from "../../value/page-value.module.code.ts"

const PAGE_TYPE = "page-type"

const EXTENDS = "extends"

const WAS_EXTENDS = "extendsSlug"

const SLUG = "slug"

const TYPE_SLUG = "pageTypeSlug"

function gatheredIn(reading: Reading): ReadonlySet<string> {
  const seen = new Set<string>([PAGE_TYPE])
  for (;;) {
    let grew = false
    for (const one of [...seen]) {
      for (const held of valuesOfType(reading, one)) {
        const slug = textAt(held.value, SLUG)
        if (slug === null || seen.has(slug)) continue
        const above = held.value[EXTENDS] ?? held.value[WAS_EXTENDS]
        if (!slugsIn(above).some((each) => seen.has(each))) continue
        seen.add(slug)
        grew = true
      }
    }
    if (!grew) return seen
  }
}

const gathered = heldOnce(gatheredIn)

export function typeSlugsIn(given: string | Reading): ReadonlySet<string> {
  return gathered(given)
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
