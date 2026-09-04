import { collectResolutionTargetTypeIds } from "@akasha/pages-core/property-types/resolution-target-types"
import type { PageTypePropertiesMap } from "@akasha/pages-core/property-types/rollup"
import type { ViewDataJSON } from "@akasha/pages-core/schema/view-data"
import type { PropertyDefinition } from "@akasha/pages-core/types"

export interface ViewTargetSlugs {
  readonly gating: readonly string[]
  readonly display: readonly string[]
}

function slugsForKey(
  key: string,
  primaryDefs: readonly PropertyDefinition[],
  primaryPageTypeId: string,
  defsByTypeId: PageTypePropertiesMap,
  slugByTypeId: ReadonlyMap<string, string | undefined>
): readonly string[] {
  const def = primaryDefs.find((p) => p.id === key)
  if (def === undefined) return []
  const targetTypeIds = collectResolutionTargetTypeIds(def, primaryPageTypeId, defsByTypeId)
  const slugs: string[] = []
  for (const typeId of targetTypeIds) {
    const slug = slugByTypeId.get(typeId)
    if (typeof slug === "string" && slug.length > 0) slugs.push(slug)
  }
  return slugs
}

export function deriveViewTargetSlugs(
  config: ViewDataJSON,
  primaryPageTypeId: string,
  defsByTypeId: PageTypePropertiesMap,
  slugByTypeId: ReadonlyMap<string, string | undefined>
): ViewTargetSlugs {
  const primaryDefs = defsByTypeId.get(primaryPageTypeId) ?? []

  const gatingKeys = new Set<string>()
  for (const s of config.sorts ?? []) gatingKeys.add(s.field)
  if (config.group_by !== undefined && config.group_by.length > 0) gatingKeys.add(config.group_by)
  for (const f of config.filters ?? []) gatingKeys.add(f.propertyId)

  const displayKeys = new Set<string>()
  for (const key of config.visible_properties ?? []) {
    if (!gatingKeys.has(key)) displayKeys.add(key)
  }

  const gating = new Set<string>()
  for (const key of gatingKeys) {
    for (const slug of slugsForKey(
      key,
      primaryDefs,
      primaryPageTypeId,
      defsByTypeId,
      slugByTypeId
    )) {
      gating.add(slug)
    }
  }

  const display = new Set<string>()
  for (const key of displayKeys) {
    for (const slug of slugsForKey(
      key,
      primaryDefs,
      primaryPageTypeId,
      defsByTypeId,
      slugByTypeId
    )) {
      if (!gating.has(slug)) display.add(slug)
    }
  }

  return { gating: [...gating].sort(), display: [...display].sort() }
}
