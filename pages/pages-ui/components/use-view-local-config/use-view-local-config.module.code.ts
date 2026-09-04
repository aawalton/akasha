"use client"

import type { ViewConfig, ViewFilter } from "@akasha/pages-core/schema/view-data"
import {
  DEFAULT_GROUP_PAGE_SIZE,
  DEFAULT_ITEM_PAGE_SIZE,
  DEFAULT_PAGE_SIZE,
} from "@akasha/pages-core/schema/view-data"
import { useCallback, useMemo, useState } from "react"

export interface ViewLocalConfigDefaults {
  defaultFilters?: readonly ViewFilter[]
  defaultSorts?: ViewConfig["sorts"]
  defaultGroupBy?: string
  defaultGroupSorts?: ViewConfig["groupSorts"]
  defaultCalendarDateBy?: string
  defaultTimelineStartProperty?: string
  defaultTimelineEndProperty?: string
  defaultPageSize?: number
  defaultGroupPageSize?: number
  defaultItemPageSize?: number
}

export function useViewLocalConfig(
  defaults: ViewLocalConfigDefaults,
  onConfigChange?: (config: ViewConfig) => void
) {
  const [localSorts, setLocalSorts] = useState<ViewConfig["sorts"]>(defaults.defaultSorts ?? [])
  const [localFilters, setLocalFilters] = useState<readonly ViewFilter[]>(
    defaults.defaultFilters ?? []
  )
  const [localGroupBy, setLocalGroupBy] = useState<string | undefined>(defaults.defaultGroupBy)
  const [localGroupSorts, setLocalGroupSorts] = useState<ViewConfig["groupSorts"]>(
    defaults.defaultGroupSorts ?? []
  )
  const [localCalendarDateBy, setLocalCalendarDateBy] = useState<string | undefined>(
    defaults.defaultCalendarDateBy
  )
  const [localTimelineStartProperty, setLocalTimelineStartProperty] = useState<string | undefined>(
    defaults.defaultTimelineStartProperty
  )
  const [localTimelineEndProperty, setLocalTimelineEndProperty] = useState<string | undefined>(
    defaults.defaultTimelineEndProperty
  )
  const [localPageSize, setLocalPageSize] = useState<number>(
    defaults.defaultPageSize ?? DEFAULT_PAGE_SIZE
  )
  const [localGroupPageSize, setLocalGroupPageSize] = useState<number>(
    defaults.defaultGroupPageSize ?? DEFAULT_GROUP_PAGE_SIZE
  )
  const [localItemPageSize, setLocalItemPageSize] = useState<number>(
    defaults.defaultItemPageSize ?? DEFAULT_ITEM_PAGE_SIZE
  )

  const viewConfig: ViewConfig = useMemo(
    () => ({
      sorts: localSorts,
      filters: localFilters,
      groupBy: localGroupBy,
      groupSorts: localGroupSorts,
      calendarDateBy: localCalendarDateBy,
      timelineStartProperty: localTimelineStartProperty,
      timelineEndProperty: localTimelineEndProperty,
      pageSize: localPageSize,
      groupPageSize: localGroupPageSize,
      itemPageSize: localItemPageSize,
    }),
    [
      localSorts,
      localFilters,
      localGroupBy,
      localGroupSorts,
      localCalendarDateBy,
      localTimelineStartProperty,
      localTimelineEndProperty,
      localPageSize,
      localGroupPageSize,
      localItemPageSize,
    ]
  )

  const onViewConfigChange = useCallback(
    (config: ViewConfig) => {
      setLocalSorts(config.sorts ?? [])
      setLocalFilters([...(config.filters ?? [])])
      setLocalGroupBy(config.groupBy)
      setLocalGroupSorts(config.groupSorts ?? [])
      setLocalCalendarDateBy(config.calendarDateBy)
      setLocalTimelineStartProperty(config.timelineStartProperty)
      setLocalTimelineEndProperty(config.timelineEndProperty)
      if (config.pageSize != null) setLocalPageSize(config.pageSize)
      if (config.groupPageSize != null) setLocalGroupPageSize(config.groupPageSize)
      if (config.itemPageSize != null) setLocalItemPageSize(config.itemPageSize)
      onConfigChange?.(config)
    },
    [onConfigChange]
  )

  return {
    localSorts,
    localFilters,
    localGroupBy,
    localCalendarDateBy,
    localTimelineStartProperty,
    localTimelineEndProperty,
    localPageSize,
    localGroupPageSize,
    localItemPageSize,
    viewConfig,
    onViewConfigChange,
  }
}
