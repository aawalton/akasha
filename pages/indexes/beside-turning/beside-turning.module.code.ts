import { textAt, type Value } from "@akasha/pages/page-value"
import type { FilePropertiesBy } from "../entries/index-entries.module.code.ts"
import type { SidecarsBy } from "../path-claiming/path-claiming.module.code.ts"
import { everyPath, type Valued, valuesOfType } from "../reading/index-reading.module.code.ts"
import type { Reading } from "../shape/index-shape.module.code.ts"

const PAGE_TYPE = "page-type"

export type Besides = {
  readonly fileProperties: FilePropertiesBy
  readonly sidecars: SidecarsBy
}

function shapeOf(given: Besides, slug: string): string {
  const carried = given.fileProperties.get(slug) ?? new Map<string, string | null>()
  const held = given.sidecars.get(slug)
  const beside = [...(held?.besides ?? [])]
    .filter(([key]) => carried.get(key) === null)
    .map(([key, one]) => [key, one.held, one.uncommitted])
  return JSON.stringify([
    [...carried].sort(),
    held?.secret === true,
    held?.uncommitted === true,
    beside.sort(),
  ])
}

export function besidesTurned(was: Besides, now: Besides): ReadonlySet<string> {
  const found = new Set<string>()
  const slugs = new Set([
    ...was.fileProperties.keys(),
    ...now.fileProperties.keys(),
    ...was.sidecars.keys(),
    ...now.sidecars.keys(),
  ])
  for (const slug of slugs) {
    if (shapeOf(was, slug) !== shapeOf(now, slug)) found.add(slug)
  }
  return found
}

export function pagesElsewhere(
  reading: Reading,
  turned: ReadonlySet<string>,
  carried: ReadonlySet<string>,
  pageOf: (path: string) => Value | null
): readonly Valued[] {
  if (turned.size === 0) return []
  const found: Valued[] = []
  for (const path of everyPath(reading)) {
    if (carried.has(path)) continue
    const value = pageOf(path)
    if (value !== null) found.push({ path, value })
  }
  return found
}

function typesNamed(values: readonly Value[]): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of values) {
    if ((textAt(one, "type") ?? textAt(one, "pageTypeSlug")) !== PAGE_TYPE) continue
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

export function pagesTurned(
  reading: Reading,
  was: Besides,
  now: Besides,
  carried: ReadonlySet<string>
): readonly Valued[] {
  const found: Valued[] = []
  for (const slug of besidesTurned(was, now)) {
    for (const one of valuesOfType(reading, slug)) {
      if (!carried.has(one.path)) found.push(one)
    }
  }
  return found
}
