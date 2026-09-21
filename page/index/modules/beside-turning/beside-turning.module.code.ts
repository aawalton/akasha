import {
  everyValue,
  type Valued,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  textAt,
  typeIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const PAGE_TYPE = "page-type"

export function pagesElsewhere(
  reading: Reading,
  turned: ReadonlySet<string>,
  carried: ReadonlySet<string>
): readonly Valued[] {
  if (turned.size === 0) return []
  const found: Valued[] = []
  for (const [path, value] of everyValue(reading)) {
    if (carried.has(path)) continue
    found.push({ path, value })
  }
  return found
}

function typesNamed(values: readonly Value[]): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of values) {
    if (typeIn(one) !== PAGE_TYPE) continue
    const slug = textAt(one, "slug")
    if (slug !== null) found.add(slug)
  }
  return found
}

export function pagesStranded(
  reading: Reading,
  before: readonly Value[],
  left: readonly Value[],
  carried: ReadonlySet<string>
): readonly Valued[] {
  const now = typesNamed(left)
  const found: Valued[] = []
  for (const slug of typesNamed(before)) {
    if (now.has(slug)) continue
    for (const one of valuesOfType(reading, slug)) {
      if (!carried.has(one.path)) found.push(one)
    }
  }
  return found
}
