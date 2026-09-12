import type { PropertyDefinition } from "akasha/pages/core/page-data/page-data.module.code.ts"
import { GROUP_NONE_KEY } from "akasha/pages/core/view/modules/apply-grouping-shared/apply-grouping-shared.module.code.ts"

export function isBoardDraggableGroupType(prop: PropertyDefinition): boolean {
  return prop.type === "select" || prop.type === "boolean" || prop.type === "relation"
}

export function groupKeyToPropertyValue(prop: PropertyDefinition, key: string): unknown {
  if (prop.type === "boolean") return key === "true"
  if (prop.type === "select" || prop.type === "relation") {
    return key === GROUP_NONE_KEY ? null : key
  }
  return undefined
}
