import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { textAt, type Value } from "akasha/pages/value/page-value.module.code.ts"
import {
  identityOf,
  propertiesIfNamed,
  type Source,
} from "../../types/declared-properties/declared-properties.module.code.ts"
import {
  typeSlugsIn,
  typesAmong,
  typeValuesIn,
} from "../../types/gathering/page-type-gathering.module.code.ts"
import type { FilePropertiesBy } from "../entries/index-entries.module.code.ts"
import type { SidecarsBy } from "../path-claiming/path-claiming.module.code.ts"
import {
  everyValue,
  namersOf,
  type Valued,
  valuesByPath,
  valuesOfType,
} from "../reading/index-reading.module.code.ts"
import type { Filing, Reading, Schema } from "../shape/index-shape.module.code.ts"

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

export function pagesOfTypes(
  reading: Reading,
  types: ReadonlySet<string>,
  carried: ReadonlySet<string>
): readonly Valued[] {
  const found: Valued[] = []
  for (const slug of types) {
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
  return pagesOfTypes(reading, besidesTurned(was, now), carried)
}

export function typesDeclaring(
  reading: Reading,
  sources: readonly Source[],
  named: ReadonlySet<string>
): ReadonlySet<string> {
  const found = new Set<string>()
  if (named.size === 0) return found
  const among = typeSlugsIn(reading)
  for (const slug of typesAmong(typeValuesIn(reading, among), among).keys()) {
    for (const source of sources) {
      const carried = propertiesIfNamed(slug, source) ?? []
      if (!carried.some((one) => named.has(identityOf(one)))) continue
      found.add(slug)
      break
    }
  }
  return found
}

export function relationsTurned(
  was: ReadonlyMap<string, Schema>,
  now: ReadonlyMap<string, Schema>
): ReadonlySet<string> {
  const found = new Set<string>()
  for (const named of new Set([...was.keys(), ...now.keys()])) {
    const before = was.get(named)
    const after = now.get(named)
    if (before === undefined || after === undefined) {
      found.add(named)
      continue
    }
    const turned =
      before.propertySlug !== after.propertySlug ||
      before.targetPageTypeSlug !== after.targetPageTypeSlug
    if (turned) found.add(named)
  }
  return found
}

function idsIn(lines: readonly string[]): ReadonlySet<string> {
  const found = new Set<string>()
  for (const line of lines) {
    const said = JSON.parse(line) as { readonly id?: unknown }
    if (typeof said.id === "string") found.add(said.id)
  }
  return found
}

export function idsUnnamed(reading: Reading, identity: readonly Filing[]): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of identity) {
    const held = reading.lines(one.at)
    if (held.length === 0) continue
    const after = idsIn(one.lines)
    for (const id of idsIn(held)) {
      if (!after.has(id)) found.add(id)
    }
  }
  return found
}

export function pagesNaming(
  reading: Reading,
  gone: ReadonlySet<string>,
  carried: ReadonlySet<string>
): readonly Valued[] {
  const found: Valued[] = []
  const seen = new Set<string>()
  for (const id of gone) {
    for (const one of namersOf(reading, id)) {
      if (carried.has(one.path) || seen.has(one.path)) continue
      seen.add(one.path)
      const said = partedIn(one.path)
      if (said === null) continue
      const value = valuesByPath(reading, said.pageType).get(one.path)
      if (value !== undefined) found.push({ path: one.path, value })
    }
  }
  return found
}
