import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { PROPERTY_TYPE_OPS_REGISTRY } from "akasha/page/core/property-type/modules/registry/registry.module.code.ts"
import type { FilterableRow } from "akasha/page/core/view/modules/apply-filters/apply-filters.module.code.ts"
import type { PageResolver } from "akasha/page/core/view/modules/apply-grouping-shared/apply-grouping-shared.module.code.ts"

export function generateSortAccessors(
  properties: readonly PropertyDefinition[],
  resolver?: PageResolver | null
): Record<string, (item: FilterableRow) => string | number | null> {
  const accessors: Record<string, (item: FilterableRow) => string | number | null> = {}
  for (const prop of properties) {
    const ops = PROPERTY_TYPE_OPS_REGISTRY[prop.type]
    if (!ops) continue
    if (prop.type === "relation" && resolver != null) {
      accessors[prop.id] = (row) => {
        const raw = row[prop.id]
        if (typeof raw === "string" && raw !== "") {
          const entry = resolver.resolve(raw)
          if (entry != null) {
            return typeof entry.sortOrder === "number" ? entry.sortOrder : entry.title
          }
        }
        return ops.getSortValue(raw ?? null, prop)
      }
      continue
    }
    accessors[prop.id] = (row) => ops.getSortValue(row[prop.id] ?? null, prop)
  }
  return accessors
}
