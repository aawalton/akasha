"use client"

import type { PageTypePropertiesMap } from "@akasha/pages-core/property-types/rollup"
import type { GroupGranularity, ViewConfig, ViewSort } from "@akasha/pages-core/schema/view-data"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import { generateGroupOptions } from "@akasha/pages-core/view/apply-grouping"
import type { GroupOption, GroupSortOption } from "@akasha/pages-core/view/apply-grouping-shared"
import {
  generateGroupSortOptions,
  getDefaultGroupSorts,
} from "@akasha/pages-core/view/apply-grouping-sort"
import { applyView } from "@akasha/pages-core/view/apply-view"
import {
  generateFilterDimensions,
  type PageFilterDimension,
} from "@akasha/pages-core/view/generate-filter-dimensions"
import { generateSortOptions, type SortOption } from "@akasha/pages-core/view/generate-sort-options"
import { usePageResolverOptional } from "@akasha/pages-ui/contexts/page-resolver-context"
import type { PageRow } from "@akasha/pages-ui-components/view-engine/view-row"
import { useCallback, useMemo, useRef } from "react"

export interface UsePageViewProps {
  pages: readonly PageRow[]
  properties: readonly PropertyDefinition[]
  viewConfig: ViewConfig
  onViewConfigChange: (config: ViewConfig) => void
  pageTypeId?: string
  propertiesByPageType?: PageTypePropertiesMap
}

export interface UsePageViewResult {
  filtered: readonly PageRow[]
  sortOptions: readonly SortOption[]
  sorts: readonly ViewSort[]
  onSortsChange: (sorts: readonly ViewSort[]) => void
  groupOptions: readonly GroupOption[]
  groupBy: string
  onGroupByChange: (value: string) => void
  groupSorts: readonly ViewSort[]
  onGroupSortsChange: (sorts: readonly ViewSort[]) => void
  groupSortOptions: readonly GroupSortOption[]
  defaultGroupSorts: (groupValue: string) => readonly ViewSort[]
  groupGranularity: GroupGranularity
  onGroupGranularityChange: (granularity: GroupGranularity) => void
  granularityApplicable: boolean
  filterDimensions: readonly PageFilterDimension[]
  hasActiveFilters: boolean
  onReset: () => void
}

export function usePageView({
  pages,
  properties,
  viewConfig,
  onViewConfigChange,
  pageTypeId,
  propertiesByPageType,
}: UsePageViewProps): UsePageViewResult {
  const sortOptions = useMemo(() => generateSortOptions(properties), [properties])
  const filterDimensions = useMemo(
    () => generateFilterDimensions(properties, pageTypeId, propertiesByPageType),
    [properties, pageTypeId, propertiesByPageType]
  )
  const groupOptions = useMemo(() => generateGroupOptions(properties), [properties])

  const resolver = usePageResolverOptional()

  const filtered = useMemo(
    () => applyView(pages, properties, viewConfig, pageTypeId, propertiesByPageType, resolver),
    [pages, properties, viewConfig, pageTypeId, propertiesByPageType, resolver]
  )

  const groupBy = viewConfig.groupBy ?? ""
  const groupSorts = viewConfig.groupSorts ?? []
  const groupGranularity = viewConfig.groupGranularity ?? "none"

  const granularityApplicable = useMemo(() => {
    if (groupBy === "") return false
    const prop = properties.find((p) => p.id === groupBy)
    return prop?.type === "calendar-date" || prop?.type === "instant"
  }, [groupBy, properties])

  const currentGroupSortOptions = useMemo(
    () => (groupBy !== "" ? generateGroupSortOptions(groupBy, properties) : []),
    [groupBy, properties]
  )

  const defaultGroupSortsFn = useCallback(
    (groupValue: string) => getDefaultGroupSorts(groupValue, properties),
    [properties]
  )

  const sorts = viewConfig.sorts ?? []
  const filters = viewConfig.filters ?? []

  const hasActiveFilters = filters.length > 0 || sorts.length > 0 || groupBy !== ""

  const viewConfigRef = useRef(viewConfig)
  viewConfigRef.current = viewConfig

  const applyConfig = useCallback(
    (next: ViewConfig) => {
      viewConfigRef.current = next
      onViewConfigChange(next)
    },
    [onViewConfigChange]
  )

  const onSortsChange = useCallback(
    (newSorts: readonly ViewSort[]) => {
      applyConfig({ ...viewConfigRef.current, sorts: newSorts })
    },
    [applyConfig]
  )

  const onGroupByChange = useCallback(
    (value: string) => {
      applyConfig({
        ...viewConfigRef.current,
        groupBy: value,
        groupSorts: undefined,
      })
    },
    [applyConfig]
  )

  const onGroupSortsChange = useCallback(
    (newGroupSorts: readonly ViewSort[]) => {
      applyConfig({ ...viewConfigRef.current, groupSorts: newGroupSorts })
    },
    [applyConfig]
  )

  const onGroupGranularityChange = useCallback(
    (granularity: GroupGranularity) => {
      applyConfig({ ...viewConfigRef.current, groupGranularity: granularity })
    },
    [applyConfig]
  )

  const onReset = useCallback(() => {
    applyConfig({ sorts: [], filters: [], groupBy: "", groupSorts: undefined })
  }, [applyConfig])

  return {
    filtered,
    sortOptions,
    sorts,
    onSortsChange,
    groupOptions,
    groupBy,
    onGroupByChange,
    groupSorts,
    onGroupSortsChange,
    groupSortOptions: currentGroupSortOptions,
    defaultGroupSorts: defaultGroupSortsFn,
    groupGranularity,
    onGroupGranularityChange,
    granularityApplicable,
    filterDimensions,
    hasActiveFilters,
    onReset,
  }
}
