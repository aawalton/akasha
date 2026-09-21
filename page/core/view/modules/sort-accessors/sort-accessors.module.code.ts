import type {
  PageTypePropertiesMap,
  PropertyDefinition,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { PROPERTY_TYPE_OPS_REGISTRY } from "akasha/page/core/property-type/modules/registry/registry.module.code.ts"
import { resolveComputedProperty } from "akasha/page/core/property-type/modules/resolve-computed-type/resolve-computed-type.module.code.ts"
import type { FilterableRow } from "akasha/page/core/view/modules/apply-filters/apply-filters.module.code.ts"
import type { PageResolver } from "akasha/page/core/view/modules/apply-grouping-shared/apply-grouping-shared.module.code.ts"

export function generateSortAccessors(
  properties: readonly PropertyDefinition[],
  propertiesByPageType?: PageTypePropertiesMap,
  resolver?: PageResolver | null
): Record<string, (item: FilterableRow) => string | number | null> {
  const accessors: Record<string, (item: FilterableRow) => string | number | null> = {}
  for (const prop of properties) {
    const effective =
      propertiesByPageType !== undefined
        ? resolveComputedProperty(prop, propertiesByPageType)
        : prop
    const ops = PROPERTY_TYPE_OPS_REGISTRY[effective.type]
    if (!ops) continue
    if (effective.type === "relation" && resolver != null) {
      accessors[prop.id] = (row) => {
        const raw = row[prop.id]
        if (typeof raw === "string" && raw !== "") {
          const entry = resolver.resolve(raw)
          if (entry != null) {
            return typeof entry.sortOrder === "number" ? entry.sortOrder : entry.title
          }
        }
        return ops.getSortValue(raw ?? null, effective)
      }
      continue
    }
    accessors[prop.id] = (row) => ops.getSortValue(row[prop.id] ?? null, effective)
  }
  return accessors
}
