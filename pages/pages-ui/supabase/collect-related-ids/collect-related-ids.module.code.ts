export const RELATED_IDS_PER_PROPERTY_CAP = 1000

export type RelationSpec = {
  readonly propertyId: string
  readonly targetPageTypeSlug: string
}

export type RelatedIdGroup = {
  readonly pageTypeSlug: string
  readonly ids: readonly string[]
}

export function collectRelatedIds(
  pages: readonly { properties: Record<string, unknown> }[],
  specs: readonly RelationSpec[],
  perPropertyCap: number
): readonly RelatedIdGroup[] {
  const byPageType = new Map<string, Set<string>>()
  for (const spec of specs) {
    let collected = 0
    for (const page of pages) {
      if (collected >= perPropertyCap) break
      const val = page.properties[spec.propertyId]
      const values: unknown[] = Array.isArray(val) ? val : [val]
      for (const v of values) {
        if (collected >= perPropertyCap) break
        if (typeof v !== "string" || v === "") continue
        const held = byPageType.get(spec.targetPageTypeSlug) ?? new Set<string>()
        byPageType.set(spec.targetPageTypeSlug, held)
        if (held.has(v)) continue
        held.add(v)
        collected += 1
      }
    }
  }
  return [...byPageType.entries()]
    .map(([pageTypeSlug, ids]) => ({ pageTypeSlug, ids: [...ids].sort() }))
    .sort((a, b) => (a.pageTypeSlug < b.pageTypeSlug ? -1 : 1))
}
