import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { buildPageTypeSlugMaps } from "akasha/page/ui/component/modules/view-tab-content-href/view-tab-content-href.module.code.ts"
import {
  addressOf,
  scopeKeysIn,
} from "akasha/page/ui/component/view-engine/modules/build-page-resolver/build-page-resolver.module.code.ts"
import type { PageWithProperties } from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"

export const RELATED_IDS_PER_PROPERTY_CAP = 1000

const EACH_WAY = ["id", "slug"] as const

export type RelatedWay = (typeof EACH_WAY)[number]

export type RelationSpec = {
  readonly propertyId: string
  readonly targetPageTypeSlug: string
}

export type RelatedIdGroup = {
  readonly pageTypeSlug: string
  readonly by: RelatedWay
  readonly values: readonly string[]
}

type Named = {
  readonly pageTypeSlug: string
  readonly by: RelatedWay
  readonly value: string
}

function namedIn(value: string, targetPageTypeSlug: string): Named {
  const address = addressIn(value)
  if (address.kind === "id") return { pageTypeSlug: targetPageTypeSlug, by: "id", value }
  if (address.kind === "bare") {
    return { pageTypeSlug: targetPageTypeSlug, by: "slug", value: address.slug }
  }
  return { pageTypeSlug: address.pageTypeSlug, by: "slug", value: address.slug }
}

function namedBy(
  pages: readonly { properties: Record<string, unknown> }[],
  specs: readonly RelationSpec[]
): ReadonlySet<string> {
  const named = new Set<string>()
  for (const spec of specs) {
    for (const page of pages) {
      const val = page.properties[spec.propertyId]
      const values: unknown[] = Array.isArray(val) ? val : [val]
      for (const v of values) if (typeof v === "string" && v !== "") named.add(v)
    }
  }
  return named
}

export function relatedAsNamed<P extends PageWithProperties>(
  found: readonly P[],
  pages: readonly { properties: Record<string, unknown> }[],
  specs: readonly RelationSpec[],
  pageTypes: readonly PageWithProperties[]
): readonly P[] {
  const named = namedBy(pages, specs)
  const { slugById } = buildPageTypeSlugMaps(pageTypes)
  const scopeKeys = scopeKeysIn(pageTypes)
  return found.filter((page) => {
    if (named.has(page._id)) return true
    const address = addressOf(page, slugById, scopeKeys)
    if (address === null || addressIn(address).kind !== "scoped") return true
    return named.has(address)
  })
}

export function collectRelatedIds(
  pages: readonly { properties: Record<string, unknown> }[],
  specs: readonly RelationSpec[],
  perPropertyCap: number
): readonly RelatedIdGroup[] {
  const byWay: Record<RelatedWay, Map<string, Set<string>>> = { id: new Map(), slug: new Map() }
  for (const spec of specs) {
    let collected = 0
    for (const page of pages) {
      if (collected >= perPropertyCap) break
      const val = page.properties[spec.propertyId]
      const values: unknown[] = Array.isArray(val) ? val : [val]
      for (const v of values) {
        if (collected >= perPropertyCap) break
        if (typeof v !== "string" || v === "") continue
        const named = namedIn(v, spec.targetPageTypeSlug)
        const byPageType = byWay[named.by]
        const held = byPageType.get(named.pageTypeSlug) ?? new Set<string>()
        byPageType.set(named.pageTypeSlug, held)
        if (held.has(named.value)) continue
        held.add(named.value)
        collected += 1
      }
    }
  }
  return EACH_WAY.flatMap((by) =>
    [...byWay[by].entries()]
      .map(([pageTypeSlug, values]) => ({ pageTypeSlug, by, values: [...values].sort() }))
      .sort((a, b) => (a.pageTypeSlug < b.pageTypeSlug ? -1 : 1))
  )
}
