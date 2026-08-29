import {
  namesIn,
  pageTypesIn,
  textAt,
  type Value,
} from "../../../pages-system/indexes/index-entries.module.code.ts"
import { indexIn, standingAt } from "../../../pages-system/indexes/index-reading.module.code.ts"
import { namedIn } from "../../../pages-system/page/page-file-name.module.code.ts"
import type { Judged, Leaving } from "../../judging.module.code.ts"
import {
  declaredFor,
  type Reading,
  readingIn,
  slugOf,
} from "../page-matches-its-type/page-matches-its-type.check.code.ts"
import { type Carried, carriedBy } from "../relation-resolves/relation-resolves.check.code.ts"

const INSIDE = "akasha/"

const PAGE_TYPE = "page-type"

const DECLARED = "properties"

const SAID = "pagePropertySlug"

const PARTS = "partSlugs"

const ABOVE = "extendsSlug"

export type Standing = {
  readonly slug: string
  readonly path: string
  readonly value: Value | null
}

export function typeNamedIn(path: string): string | null {
  if (!path.startsWith(INSIDE)) return null
  const said = namedIn(path)
  if (said === null || said.tail !== PAGE_TYPE) return null
  return said.stem
}

export function declaresIn(value: Value | null): readonly string[] {
  const held = value === null ? null : value[DECLARED]
  if (held === null || held === undefined || !Array.isArray(held)) return []
  const found: string[] = []
  for (const one of held) {
    if (one === null || typeof one !== "object" || Array.isArray(one)) continue
    const said = textAt(one as Record<string, unknown>, SAID)
    if (said !== null) found.push(said)
  }
  return found
}

export function introducedIn(value: Value | null, read: Reading): readonly string[] {
  if (value === null) return []
  const said = textAt(value, ABOVE)
  const above = said === null ? null : slugOf(said)
  const inherited = above === null ? null : declaredFor(above, read)
  return declaresIn(value).filter((one) => inherited === null || !inherited.has(one))
}

export function partedIn(value: Value | null): ReadonlySet<string> {
  const held = value === null ? null : value[PARTS]
  const found = new Set<string>()
  if (held === null || held === undefined) return found
  for (const said of namesIn(held)) found.add(said.slice(said.indexOf("/") + 1))
  return found
}

export function everyType(
  leaving: Leaving,
  read: Reading,
  carried: readonly Carried[]
): readonly Standing[] {
  const found: Standing[] = []
  const held = new Set<string>()
  for (const one of carried) {
    const slug = typeNamedIn(one.path)
    if (slug === null) continue
    held.add(slug)
    found.push({ slug, path: one.path, value: one.value })
  }
  const taken = new Set(leaving.changed.filter((one) => leaving.at(one) === null))
  for (const slug of pageTypesIn(indexIn(leaving.root))) {
    if (held.has(slug)) continue
    const at = standingAt(leaving.root, PAGE_TYPE, slug)[0]
    if (at === undefined || taken.has(at.path)) continue
    found.push({ slug, path: at.path, value: read(PAGE_TYPE, slug) })
  }
  return found
}

export function introducersIn(
  standing: readonly Standing[],
  read: Reading
): ReadonlyMap<string, readonly string[]> {
  const found = new Map<string, string[]>()
  for (const one of standing) {
    for (const propertySlug of introducedIn(one.value, read)) {
      const held = found.get(propertySlug)
      if (held === undefined) found.set(propertySlug, [one.slug])
      else held.push(one.slug)
    }
  }
  return found
}

function reasonFor(propertySlug: string, typeSlug: string): string {
  return (
    `introduces \`${propertySlug}\` and does not name it among its parts — a property ` +
    `stands under the page type introducing it, and \`${typeSlug}\` is the only one that does`
  )
}

export function introducedPropertyIsAPart(leaving: Leaving): readonly Judged[] {
  const carried = carriedBy(leaving, pageTypesIn(indexIn(leaving.root)))
  if (!carried.some((one) => typeNamedIn(one.path) !== null)) return []
  const read = readingIn(leaving)
  const standing = everyType(leaving, read, carried)
  const introducers = introducersIn(standing, read)
  const said: Judged[] = []
  for (const one of standing) {
    const parts = partedIn(one.value)
    for (const propertySlug of introducedIn(one.value, read)) {
      if (parts.has(propertySlug)) continue
      if ((introducers.get(propertySlug) ?? []).length !== 1) continue
      said.push({ path: one.path, reason: reasonFor(propertySlug, one.slug) })
    }
  }
  return said
}
