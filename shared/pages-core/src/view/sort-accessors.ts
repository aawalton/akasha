import { propertyTypeOpsRegistry } from "../property-types/registry"
import { resolveComputedProperty } from "../property-types/resolve-computed-type"
import type { PageTypePropertiesMap } from "../property-types/rollup"
import type { PropertyDefinition } from "../types"
import type { FilterableRow } from "./apply-filters"
import type { PageResolver } from "./apply-grouping-shared"

export function generateSortAccessors(
  properties: readonly PropertyDefinition[],
  pageTypeId?: string,
  propertiesByPageType?: PageTypePropertiesMap,
  resolver?: PageResolver | null
): Record<string, (item: FilterableRow) => string | number | null> {
  const hasContext = pageTypeId !== undefined && propertiesByPageType !== undefined
  const accessors: Record<string, (item: FilterableRow) => string | number | null> = {}
  for (const prop of properties) {
    const effective = hasContext
      ? resolveComputedProperty(prop, pageTypeId, propertiesByPageType)
      : prop
    const ops = propertyTypeOpsRegistry[effective.type]
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
