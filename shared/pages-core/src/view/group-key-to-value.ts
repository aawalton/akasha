import type { PropertyDefinition } from "../types"
import { GROUP_NONE_KEY } from "./apply-grouping-shared"

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
