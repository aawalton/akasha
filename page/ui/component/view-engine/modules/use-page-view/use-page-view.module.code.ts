"use client"

import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type {
  GroupGranularity,
  ViewConfig,
  ViewSort,
} from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import { generateGroupOptions } from "akasha/page/core/view/modules/apply-grouping/apply-grouping.module.code.ts"
import type {
  GroupOption,
  GroupSortOption,
} from "akasha/page/core/view/modules/apply-grouping-shared/apply-grouping-shared.module.code.ts"
import {
  generateGroupSortOptions,
  getDefaultGroupSorts,
} from "akasha/page/core/view/modules/apply-grouping-sort/apply-grouping-sort.module.code.ts"
import { applyView } from "akasha/page/core/view/modules/apply-view/apply-view.module.code.ts"
import {
  generateFilterDimensions,
  type PageFilterDimension,
} from "akasha/page/core/view/modules/generate-filter-dimensions/generate-filter-dimensions.module.code.ts"
import {
  generateSortOptions,
  type SortOption,
} from "akasha/page/core/view/modules/generate-sort-options/generate-sort-options.module.code.ts"
import type { PageRow } from "akasha/page/ui/component/view-engine/modules/view-row/view-row.module.code.ts"
import { usePageResolverOptional } from "akasha/page/ui/context/modules/page-resolver-context/page-resolver-context.module.code.tsx"
import { useCallback, useMemo, useRef } from "react"

export interface UsePageViewProps {
  pages: readonly PageRow[]
  properties: readonly PropertyDefinition[]
  viewConfig: ViewConfig
  onViewConfigChange: (config: ViewConfig) => void
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
}: UsePageViewProps): UsePageViewResult {
  const sortOptions = useMemo(() => generateSortOptions(properties), [properties])
  const filterDimensions = useMemo(() => generateFilterDimensions(properties), [properties])
  const groupOptions = useMemo(() => generateGroupOptions(properties), [properties])

  const resolver = usePageResolverOptional()

  const filtered = useMemo(
    () => applyView(pages, properties, viewConfig, resolver),
    [pages, properties, viewConfig, resolver]
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
