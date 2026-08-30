import {
  pageTypesIn,
  textAt,
  type Value,
} from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  everyOfType,
  indexIn,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import {
  type Shadow,
  shadowFor,
} from "../../../pages-system/indexes/index-shadow/index-shadow.module.code.ts"
import { namesIn } from "../../../pages-system/indexes/reaching/reaching.module.code.ts"
import { slugIn } from "../../../pages-system/page/page-address/page-address.module.code.ts"
import { namedIn } from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import type { Judged, Leaving } from "../../judging/judging.module.code.ts"
import {
  declaredFor,
  type Reading,
  readingIn,
} from "../page-matches-its-type/page-matches-its-type.check.code.ts"
import { type Carried, carriedBy } from "../relation-resolves/relation-resolves.check.code.ts"

const INSIDE = "akasha/"

const PAGE_TYPE = "page-type"

const DECLARED = "properties"

const SAID = "pagePropertySlug"

const PARTS = "partSlugs"

const ABOVE = "extendsSlug"

const SLUG = "slug"

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
  const above = said === null ? null : slugIn(said)
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

export function everyType(shadow: Shadow, carried: readonly Carried[]): readonly Standing[] {
  const found: Standing[] = []
  const held = new Set<string>()
  for (const one of carried) {
    const slug = typeNamedIn(one.path)
    if (slug === null) continue
    held.add(slug)
    found.push({ slug, path: one.path, value: one.value })
  }
  for (const at of everyOfType(shadow.reading, PAGE_TYPE)) {
    const value = shadow.pageOf(at.path)
    const slug = value === null ? null : textAt(value, SLUG)
    if (slug === null || held.has(slug)) continue
    held.add(slug)
    found.push({ slug, path: at.path, value })
  }
  return found
}

export function introducersIn(
  standing: readonly Standing[],
  read: Reading
): ReadonlyMap<string, readonly string[]> {
  const pairs = standing.flatMap((one) =>
    introducedIn(one.value, read).map((propertySlug) => ({ propertySlug, slug: one.slug }))
  )
  const grouped = Map.groupBy(pairs, (one) => one.propertySlug)
  return new Map(
    [...grouped].map(([at, held]): readonly [string, readonly string[]] => [
      at,
      held.map((one) => one.slug),
    ])
  )
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
  const cast = shadowFor(leaving)
  if ("refused" in cast) throw new Error(cast.refused)
  const read = readingIn(leaving)
  const standing = everyType(cast.shadow, carried)
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
