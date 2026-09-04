import type { PropertyDefinition } from "@akasha/pages-core/types"
import {
  groupKeyToPropertyValue,
  isBoardDraggableGroupType,
} from "@akasha/pages-core/view/group-key-to-value"
import { useCallback, useMemo } from "react"

interface UseBoardViewWiringArgs {
  properties: readonly PropertyDefinition[]
  groupBy: string | undefined
  onPropertyPatch?: (pageId: string, propertyId: string, value: unknown) => void
}

export interface BoardViewWiring {
  draggable: boolean
  onCardDrop: (pageId: string, toGroupKey: string) => void
}

export function useBoardViewWiring({
  properties,
  groupBy,
  onPropertyPatch,
}: UseBoardViewWiringArgs): BoardViewWiring {
  const groupProperty = useMemo(
    () => (groupBy != null ? properties.find((p) => p.id === groupBy) : undefined),
    [groupBy, properties]
  )

  const draggable =
    onPropertyPatch != null && groupProperty != null && isBoardDraggableGroupType(groupProperty)

  const onCardDrop = useCallback(
    (pageId: string, toGroupKey: string) => {
      if (onPropertyPatch == null || groupBy == null || groupProperty == null) return
      const value = groupKeyToPropertyValue(groupProperty, toGroupKey)
      if (value === undefined) return
      onPropertyPatch(pageId, groupBy, value)
    },
    [onPropertyPatch, groupBy, groupProperty]
  )

  return { draggable, onCardDrop }
}
