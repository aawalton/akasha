import { namesIn } from "@akasha/indexes/reaching"
import { slugIn } from "@akasha/pages/page-address"
import { partedIn as nameParted } from "@akasha/pages/page-file-name"
import {
  declarationsFrom,
  identityOf,
  propertiesFrom,
  type Source,
  sourceAmong,
} from "@akasha/pages/page-type-properties"
import { slugsIn, textAt, type Value } from "@akasha/pages/page-value"
import type { Shadow } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import type { Carried } from "../relation-resolves/relation-resolves.code-check.decision.code.ts"

export const PAGE_TYPE = "page-type"

const DECLARED = "properties"

const SAID = "pageProperty"

const WAS_SAID = "pagePropertySlug"

const PARTS = "parts"

const WAS_PARTS = "partSlugs"

const ABOVE = "extends"

const SLUG = "slug"

export type PageType = {
  readonly slug: string
  readonly path: string
  readonly value: Value | null
}

export function typeNamedIn(path: string): string | null {
  const said = nameParted(path)
  if (said === null || said.sections.length > 0 || said.pageType !== PAGE_TYPE) return null
  return said.slug
}

export function declaresIn(value: Value | null): readonly string[] {
  const held = value === null ? null : value[DECLARED]
  if (held === null || held === undefined || !Array.isArray(held)) return []
  const found: string[] = []
  for (const one of held) {
    if (one === null || typeof one !== "object" || Array.isArray(one)) continue
    const stated = one as Record<string, unknown>
    const said = textAt(stated, SAID) ?? textAt(stated, WAS_SAID)
    if (said !== null) found.push(said)
  }
  return found
}

export function addressedIn(said: string): string {
  return slugIn(said) ?? said
}

export function sourceOf(gathered: readonly PageType[], base: Source): Source {
  const values = gathered.flatMap((one) => (one.value === null ? [] : [one.value]))
  return sourceAmong(values, base)
}

export function introducedIn(one: PageType, source: Source): readonly string[] {
  const value = one.value
  if (value === null) return []
  const inherited = new Set(
    slugsIn(value[ABOVE]).flatMap((over) => propertiesFrom(over, source).map(identityOf))
  )
  const own = declarationsFrom(one.slug, source).filter((each) => each.declaredBy === one.slug)
  const introduced = new Set(
    own.filter((each) => !inherited.has(identityOf(each))).map((each) => each.pagePropertySlug)
  )
  return declaresIn(value).filter((each) => introduced.has(addressedIn(each)))
}

export function partedIn(value: Value | null): ReadonlySet<string> {
  const held = value === null ? null : (value[PARTS] ?? value[WAS_PARTS])
  const found = new Set<string>()
  if (held === null || held === undefined) return found
  for (const said of namesIn(held)) found.add(addressedIn(said))
  return found
}

export function everyType(shadow: Shadow, carried: readonly Carried[]): readonly PageType[] {
  const found: PageType[] = []
  const held = new Set<string>()
  for (const one of carried) {
    const slug = typeNamedIn(one.path)
    if (slug === null) continue
    held.add(slug)
    found.push({ slug, path: one.path, value: one.value })
  }
  for (const at of shadow.index.everyOfType(PAGE_TYPE)) {
    const value = shadow.pageOf(at.path)
    const slug = value === null ? null : textAt(value, SLUG)
    if (slug === null || held.has(slug)) continue
    held.add(slug)
    found.push({ slug, path: at.path, value })
  }
  return found
}

export function introducedOver(
  gathered: readonly PageType[],
  source: Source
): ReadonlyMap<string, readonly string[]> {
  return new Map(gathered.map((one) => [one.slug, introducedIn(one, source)]))
}

export function introducersIn(
  gathered: readonly PageType[],
  introduced: ReadonlyMap<string, readonly string[]>
): ReadonlyMap<string, readonly string[]> {
  const pairs = gathered.flatMap((one) =>
    (introduced.get(one.slug) ?? []).map((propertySlug) => ({ propertySlug, slug: one.slug }))
  )
  const grouped = Map.groupBy(pairs, (one) => addressedIn(one.propertySlug))
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
    `sits under the page type introducing it, and \`${typeSlug}\` is the only one that does`
  )
}

export function refusalsOver(gathered: readonly PageType[], source: Source): readonly Judged[] {
  const introduced = introducedOver(gathered, source)
  const introducers = introducersIn(gathered, introduced)
  const said: Judged[] = []
  for (const one of gathered) {
    const parts = partedIn(one.value)
    for (const propertySlug of introduced.get(one.slug) ?? []) {
      const addressed = addressedIn(propertySlug)
      if (parts.has(addressed)) continue
      if ((introducers.get(addressed) ?? []).length !== 1) continue
      said.push({ path: one.path, reason: reasonFor(propertySlug, one.slug) })
    }
  }
  return said
}
