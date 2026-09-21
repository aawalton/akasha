import { shapeOf } from "akasha/page/index/modules/property-shaping/property-shaping.module.code.ts"
import {
  heldEach,
  heldOnce,
  listedAt,
  listedById,
  readingIn,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { idsNaming } from "akasha/page/modules/reference-reading/page-reference-reading.module.code.ts"
import { slugsIn } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  typeSlugsIn,
  typesAmong,
  typeValuesIn,
} from "akasha/page/type/modules/gathering/page-type-gathering.module.code.ts"

const DECLARES = "page-property"

const EXTENDS = "extends"

const PAGE_TYPE = "page-type"

const RECORD_PROPERTY = "record-property"

const NO_TYPES: ReadonlySet<string> = new Set()

export type Declaring = {
  readonly slug: string
  readonly kind: string
  readonly id: string
  readonly path: string
}

export function declaringOf(given: string | Reading, id: string): readonly Declaring[] {
  const reading = readingIn(given)
  const found: Declaring[] = []
  for (const said of idsNaming(reading, id, DECLARES)) {
    const listed = listedById(reading, said)
    if (listed === null) continue
    const named = partedIn(listed.path)
    if (named === null || named.sections.length > 0) continue
    found.push({ slug: named.slug, kind: named.pageType, id: said, path: listed.path })
  }
  return found
}

const under = heldOnce((reading: Reading): ReadonlyMap<string, readonly string[]> => {
  const among = typeSlugsIn(reading)
  const made = new Map<string, string[]>()
  for (const [slug, value] of typesAmong(typeValuesIn(reading, among), among)) {
    for (const above of slugsIn(value[EXTENDS])) {
      const held = made.get(above)
      if (held === undefined) made.set(above, [slug])
      else held.push(slug)
    }
  }
  return made
})

function slugOf(reading: Reading, id: string): string | null {
  const listed = listedById(reading, id)
  if (listed === null) return null
  const named = partedIn(listed.path)
  if (named === null || named.sections.length > 0 || named.pageType !== PAGE_TYPE) return null
  return named.slug
}

const beneath = heldEach((reading: Reading, id: string): readonly string[] => {
  const top = slugOf(reading, id)
  if (top === null) return []
  const below = under(reading)
  const found: string[] = []
  const walked = new Set<string>()
  const waiting = [top]
  for (let one = waiting.pop(); one !== undefined; one = waiting.pop()) {
    if (walked.has(one)) continue
    walked.add(one)
    found.push(one)
    waiting.push(...(below.get(one) ?? []))
  }
  return found
})

export function underneath(given: string | Reading, id: string): readonly string[] {
  return beneath(given, id)
}

const carried = heldEach((reading: Reading, named: string): ReadonlySet<string> => {
  const filed = shapeOf(reading, named)
  if ("refused" in filed) return NO_TYPES
  const slug = filed.shape.slug
  if (slug === null) return NO_TYPES
  const listed = listedAt(reading, filed.shape.pageTypeSlug, slug)[0]
  if (listed === undefined) return NO_TYPES
  const found = new Set<string>()
  const take = (id: string, nested: boolean): undefined => {
    for (const held of declaringOf(reading, id)) {
      if (held.kind === RECORD_PROPERTY) {
        if (!nested) take(held.id, true)
        continue
      }
      if (held.kind !== PAGE_TYPE) continue
      for (const kind of underneath(reading, held.id)) found.add(kind)
    }
  }
  take(listed.id, false)
  return found
})

export function typesCarrying(given: string | Reading, named: string): ReadonlySet<string> {
  return carried(given, named)
}
