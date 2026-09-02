"use client"

import { PanelToggleProvider } from "@akasha/design-layout/panel-toggle-provider"
import { useCollapsedGroups } from "@akasha/design-patterns/use-collapsed-groups"
import type { ViewFilter } from "@akasha/pages-core/schema/view-data"
import { applySearch } from "@akasha/pages-core/view/apply-search"
import { usePageResolverOptional } from "@akasha/pages-ui/contexts/page-resolver-context"
import {
  buildTableColumns,
  isCardEligibleProperty,
} from "@akasha/pages-ui-components/card-property-columns"
import type { PageSystemTabContentProps } from "@akasha/pages-ui-components/page-system-tab-content-props"
import { sortServerGrouped } from "@akasha/pages-ui-components/page-system-view-helpers"
import { withColumnWidths } from "@akasha/pages-ui-components/page-table-widths"
import { usePageView } from "@akasha/pages-ui-components/view-engine/use-page-view"
import { useCallback, useEffect, useMemo, useState } from "react"
import { PageSystemViewBody } from "../page-system-view-body/page-system-view-body.module.code.tsx"
import { PageSystemViewHeader } from "../page-system-view-header/page-system-view-header.module.code.tsx"
import { useBoardViewWiring } from "../use-board-view-wiring/use-board-view-wiring.module.code.ts"
import { useCalendarViewWiring } from "../use-calendar-view-wiring/use-calendar-view-wiring.module.code.ts"
import { useTimelineConfig } from "../use-timeline-config/use-timeline-config.module.code.ts"
import { useViewLocalConfig } from "../use-view-local-config/use-view-local-config.module.code.ts"

export function PageSystemTabContent({
  items,
  label,
  properties,
  renderItem,
  renderRow,
  onReorderColumns,
  onReorderCards,
  hasRowActions,
  searchField = "title",
  storagePrefix = "pages",
  defaultFilters,
  defaultSorts,
  defaultGroupBy,
  defaultGroupSorts,
  defaultCalendarDateBy,
  defaultTimelineStartProperty,
  defaultTimelineEndProperty,
  defaultPageSize,
  defaultGroupPageSize,
  defaultItemPageSize,
  onConfigChange,
  onLoadMore,
  canLoadMore,
  layout,
  onLayoutChange,
  pageTypeId,
  pageTypeSlug,
  onPageTypeChange,
  pageTypeOptions,
  isCrossType = false,
  totalCount,
  onCreatePage,
  serverGrouped,
  isLoading = false,
  propertiesByPageType,
  visibleProperties,
  hiddenPropertiesOrder,
  alwaysShowProperties,
  onVisibilityChange,
  onPropertyPatch,
  galleryCardSize,
  galleryCoverSource,
  galleryCoverSourceOptions,
  onGalleryCoverSourceChange,
  onGalleryCardSizeChange,
  notesProperty,
  notesPropertyOptions,
  onNotesPropertyChange,
  embedded = false,
}: PageSystemTabContentProps) {
  const [search, setSearch] = useState("")
  const [creating, setCreating] = useState(false)
  const {
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
  } = useViewLocalConfig(
    {
      defaultFilters,
      defaultSorts,
      defaultGroupBy,
      defaultGroupSorts,
      defaultCalendarDateBy,
      defaultTimelineStartProperty,
      defaultTimelineEndProperty,
      defaultPageSize,
      defaultGroupPageSize,
      defaultItemPageSize,
    },
    onConfigChange
  )

  const searchFiltered = useMemo(
    () => applySearch(items, search, searchField),
    [items, search, searchField]
  )

  const {
    filtered,
    sortOptions,
    sorts,
    onSortsChange,
    groupOptions,
    groupBy,
    onGroupByChange,
    groupSorts,
    onGroupSortsChange,
    groupSortOptions,
    defaultGroupSorts: getDefaultGroupSortsForGroupValue,
    groupGranularity,
    onGroupGranularityChange,
    granularityApplicable,
    filterDimensions,
    hasActiveFilters,
    onReset,
  } = usePageView({
    pages: searchFiltered,
    properties,
    viewConfig,
    onViewConfigChange,
    pageTypeId,
    propertiesByPageType,
  })

  const onFiltersChange = useCallback(
    (newFilters: readonly ViewFilter[]) => {
      onViewConfigChange({ ...viewConfig, filters: newFilters })
    },
    [viewConfig, onViewConfigChange]
  )

  const collapsed = useCollapsedGroups({
    storageKey: `${storagePrefix}:collapsed-groups`,
  })

  const resolver = usePageResolverOptional()

  const sortedServerGrouped = useMemo(
    () => sortServerGrouped(serverGrouped, groupBy, groupSorts, properties, resolver),
    [serverGrouped, groupBy, groupSorts, properties, resolver]
  )

  const [visibleGroupCount, setVisibleGroupCount] = useState<number>(localGroupPageSize)
  useEffect(() => {
    setVisibleGroupCount(localGroupPageSize)
  }, [localGroupPageSize, sortedServerGrouped])
  const visibleGroups = useMemo(
    () => sortedServerGrouped?.slice(0, visibleGroupCount),
    [sortedServerGrouped, visibleGroupCount]
  )
  const hasMoreGroups =
    sortedServerGrouped != null && visibleGroupCount < sortedServerGrouped.length

  const groupedTableColumns = useMemo(
    () =>
      withColumnWidths(
        buildTableColumns(properties, visibleProperties ?? []),
        (visibleGroups ?? []).flatMap((group) => group.items)
      ),
    [properties, visibleProperties, visibleGroups]
  )

  const isNavView = pageTypeOptions != null
  const needsPageTypeSelection =
    isNavView && pageTypeId == null && pageTypeSlug == null && !isCrossType

  const isNarrowed = search.trim().length > 0 || localFilters.length > 0

  const showLoadingSkeleton =
    isLoading &&
    filtered.length === 0 &&
    (serverGrouped?.length ?? 0) === 0 &&
    !needsPageTypeSelection

  const paginationResetKey = useMemo(
    () =>
      JSON.stringify({
        search,
        filters: localFilters,
        sorts: localSorts,
        groupBy: localGroupBy,
        pageTypeId,
      }),
    [search, localFilters, localSorts, localGroupBy, pageTypeId]
  )

  const eligiblePropertyOptions = useMemo(
    () => properties.filter(isCardEligibleProperty).map((p) => ({ id: p.id, label: p.title })),
    [properties]
  )

  const board = useBoardViewWiring({ properties, groupBy, onPropertyPatch })
  const { timelinePropertyOptions, onTimelineStartChange, onTimelineEndChange } = useTimelineConfig(
    { properties, viewConfig, onViewConfigChange }
  )

  const calendar = useCalendarViewWiring({
    properties,
    calendarDateBy: localCalendarDateBy,
    viewConfig,
    onViewConfigChange,
    onPropertyPatch,
    onCreatePage,
  })

  return (
    <PanelToggleProvider>
      <div className="flex flex-col gap-6">
        {!embedded && (
          <PageSystemViewHeader
            label={label}
            totalCount={totalCount}
            filtered={filtered}
            canLoadMore={canLoadMore}
            hasActiveFilters={hasActiveFilters}
            onReset={onReset}
            needsPageTypeSelection={needsPageTypeSelection}
            search={search}
            setSearch={setSearch}
            sortOptions={sortOptions}
            sorts={sorts}
            onSortsChange={onSortsChange}
            filterDimensions={filterDimensions}
            viewConfig={viewConfig}
            onFiltersChange={onFiltersChange}
            layout={layout}
            onLayoutChange={onLayoutChange}
            pageTypeOptions={pageTypeOptions}
            pageTypeId={pageTypeId}
            onPageTypeChange={onPageTypeChange}
            groupOptions={groupOptions}
            groupBy={groupBy}
            onGroupByChange={onGroupByChange}
            groupSorts={groupSorts}
            onGroupSortsChange={onGroupSortsChange}
            groupSortOptions={groupSortOptions}
            defaultGroupSorts={getDefaultGroupSortsForGroupValue}
            groupGranularity={groupGranularity}
            onGroupGranularityChange={onGroupGranularityChange}
            granularityApplicable={granularityApplicable}
            timelinePropertyOptions={timelinePropertyOptions}
            timelineStartProperty={localTimelineStartProperty}
            timelineEndProperty={localTimelineEndProperty}
            onTimelineStartChange={onTimelineStartChange}
            onTimelineEndChange={onTimelineEndChange}
            eligiblePropertyOptions={eligiblePropertyOptions}
            visibleProperties={visibleProperties}
            hiddenPropertiesOrder={hiddenPropertiesOrder}
            alwaysShowProperties={alwaysShowProperties}
            onVisibilityChange={onVisibilityChange}
            pageSize={localPageSize}
            groupPageSize={localGroupPageSize}
            itemPageSize={localItemPageSize}
            onViewConfigChange={onViewConfigChange}
            galleryCoverSource={galleryCoverSource}
            galleryCoverSourceOptions={galleryCoverSourceOptions}
            onGalleryCoverSourceChange={onGalleryCoverSourceChange}
            galleryCardSize={galleryCardSize}
            onGalleryCardSizeChange={onGalleryCardSizeChange}
            notesProperty={notesProperty}
            notesPropertyOptions={notesPropertyOptions}
            onNotesPropertyChange={onNotesPropertyChange}
            creating={creating}
            setCreating={setCreating}
            onCreatePage={onCreatePage}
          />
        )}
        <PageSystemViewBody
          needsPageTypeSelection={needsPageTypeSelection}
          showLoadingSkeleton={showLoadingSkeleton}
          isNarrowed={isNarrowed}
          filtered={filtered}
          serverGrouped={serverGrouped}
          layout={layout}
          renderItem={renderItem}
          renderRow={renderRow}
          onReorderColumns={onReorderColumns}
          onReorderCards={onReorderCards}
          hasRowActions={hasRowActions}
          onLoadMore={onLoadMore}
          canLoadMore={canLoadMore}
          properties={properties}
          visibleProperties={visibleProperties}
          galleryCardSize={galleryCardSize}
          calendar={calendar}
          board={board}
          collapsed={collapsed}
          localCalendarDateBy={localCalendarDateBy}
          visibleGroups={visibleGroups}
          sortedServerGrouped={sortedServerGrouped}
          hasMoreGroups={hasMoreGroups}
          visibleGroupCount={visibleGroupCount}
          setVisibleGroupCount={setVisibleGroupCount}
          groupedTableColumns={groupedTableColumns}
          localTimelineStartProperty={localTimelineStartProperty}
          localTimelineEndProperty={localTimelineEndProperty}
          localPageSize={localPageSize}
          localGroupPageSize={localGroupPageSize}
          localItemPageSize={localItemPageSize}
          paginationResetKey={paginationResetKey}
        />
      </div>
    </PanelToggleProvider>
  )
}
