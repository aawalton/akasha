import { shapeOf } from "akasha/page/index/modules/property-shaping/property-shaping.module.code.ts"
import {
  listedAt,
  listedById,
  readingIn,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { idsNaming } from "akasha/page/modules/reference-reading/page-reference-reading.module.code.ts"

const DECLARES = "page-property"

const EXTENDS = "extends-type"

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

export function underneath(reading: Reading, id: string): readonly string[] {
  const found: string[] = []
  const walked = new Set<string>()
  const waiting = [id]
  for (let one = waiting.pop(); one !== undefined; one = waiting.pop()) {
    if (walked.has(one)) continue
    walked.add(one)
    const listed = listedById(reading, one)
    if (listed === null) continue
    const named = partedIn(listed.path)
    if (named === null || named.sections.length > 0 || named.pageType !== PAGE_TYPE) continue
    found.push(named.slug)
    waiting.push(...idsNaming(reading, one, EXTENDS))
  }
  return found
}

export function typesCarrying(given: string | Reading, named: string): ReadonlySet<string> {
  const reading = readingIn(given)
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
}
