import type { FilePropertiesBy, SidecarsBy } from "../entries/index-entries.module.code.ts"
import { type Valued, valuesOfType } from "../reading/index-reading.module.code.ts"
import type { Reading } from "../shape/index-shape.module.code.ts"

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
