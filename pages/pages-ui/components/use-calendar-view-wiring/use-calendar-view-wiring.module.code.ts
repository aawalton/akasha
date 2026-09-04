import type { ViewConfig } from "@akasha/pages-core/schema/view-data"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import {
  calendarDayToPropertyValue,
  isCalendarDraggablePropertyType,
  isCalendarKeyablePropertyType,
} from "@akasha/pages-core/view/calendar-date-to-value"
import { useCallback, useMemo } from "react"

interface UseCalendarViewWiringArgs {
  properties: readonly PropertyDefinition[]
  calendarDateBy: string | undefined
  viewConfig: ViewConfig
  onViewConfigChange: (config: ViewConfig) => void
  onPropertyPatch?: (pageId: string, propertyId: string, value: unknown) => void
  onCreatePage?: (seed?: Record<string, string | number | boolean | null>) => void | Promise<void>
}

export interface CalendarViewWiring {
  dateProperty: PropertyDefinition | undefined
  dateOptions: readonly { id: string; label: string }[]
  draggable: boolean
  onCalendarDateByChange: (id: string) => void
  onReschedule?: (pageId: string, dayStr: string) => void
  onQuickAdd?: (dayStr: string) => void | Promise<void>
}

export function useCalendarViewWiring({
  properties,
  calendarDateBy,
  viewConfig,
  onViewConfigChange,
  onPropertyPatch,
  onCreatePage,
}: UseCalendarViewWiringArgs): CalendarViewWiring {
  const onCalendarDateByChange = useCallback(
    (id: string) => onViewConfigChange({ ...viewConfig, calendarDateBy: id }),
    [viewConfig, onViewConfigChange]
  )

  const dateOptions = useMemo(
    () =>
      properties.filter(isCalendarKeyablePropertyType).map((p) => ({ id: p.id, label: p.title })),
    [properties]
  )

  const dateProperty = useMemo(
    () => (calendarDateBy != null ? properties.find((p) => p.id === calendarDateBy) : undefined),
    [calendarDateBy, properties]
  )

  const onReschedule = useCallback(
    (pageId: string, dayStr: string) => {
      if (onPropertyPatch == null || dateProperty === undefined) return
      if (!isCalendarDraggablePropertyType(dateProperty)) return
      const value = calendarDayToPropertyValue(dateProperty, dayStr)
      if (value === undefined) return
      onPropertyPatch(pageId, dateProperty.id, value)
    },
    [onPropertyPatch, dateProperty]
  )

  const onQuickAdd = useCallback(
    (dayStr: string) => {
      if (onCreatePage == null || dateProperty === undefined) return undefined
      if (!isCalendarDraggablePropertyType(dateProperty)) return undefined
      return onCreatePage({ [dateProperty.id]: dayStr })
    },
    [onCreatePage, dateProperty]
  )

  const draggable =
    onPropertyPatch != null &&
    dateProperty !== undefined &&
    isCalendarDraggablePropertyType(dateProperty)

  return {
    dateProperty,
    dateOptions,
    draggable,
    onCalendarDateByChange,
    onReschedule: onPropertyPatch != null ? onReschedule : undefined,
    onQuickAdd: onCreatePage != null ? onQuickAdd : undefined,
  }
}
