"use client"

import { Badge } from "@akasha/design-badges/badge"
import { PageTabHeader } from "@akasha/design-layout/page-tab-header"
import { SearchButton } from "@akasha/design-patterns/search-button"
import { SearchSortFilterRow } from "@akasha/design-patterns/search-sort-filter-row"
import { SortButton } from "@akasha/design-patterns/sort-button"
import type { ViewConfig, ViewFilter } from "@akasha/pages-core/schema/view-data"
import { PagesFilterBar } from "@akasha/pages-ui-components/page-filter-bar"
import type { PageSystemTabContentProps } from "@akasha/pages-ui-components/page-system-tab-content-props"
import { CreatePageButton } from "@akasha/pages-ui-components/page-system-view-helpers"
import { ViewSettingsButton } from "@akasha/pages-ui-components/page-system-view-settings"
import type { UsePageViewResult } from "@akasha/pages-ui-components/view-engine/use-page-view"
import type { PageRow } from "@akasha/pages-ui-components/view-engine/view-row"
import type { Dispatch, SetStateAction } from "react"

export interface PageSystemViewHeaderProps
  extends Pick<
      PageSystemTabContentProps,
      | "label"
      | "totalCount"
      | "canLoadMore"
      | "layout"
      | "onLayoutChange"
      | "pageTypeOptions"
      | "pageTypeId"
      | "onPageTypeChange"
      | "visibleProperties"
      | "hiddenPropertiesOrder"
      | "alwaysShowProperties"
      | "onVisibilityChange"
      | "galleryCoverSource"
      | "galleryCoverSourceOptions"
      | "onGalleryCoverSourceChange"
      | "galleryCardSize"
      | "onGalleryCardSizeChange"
      | "notesProperty"
      | "notesPropertyOptions"
      | "onNotesPropertyChange"
      | "onCreatePage"
    >,
    Pick<
      UsePageViewResult,
      | "sortOptions"
      | "sorts"
      | "onSortsChange"
      | "groupOptions"
      | "groupBy"
      | "onGroupByChange"
      | "groupSorts"
      | "onGroupSortsChange"
      | "groupSortOptions"
      | "defaultGroupSorts"
      | "groupGranularity"
      | "onGroupGranularityChange"
      | "granularityApplicable"
      | "filterDimensions"
      | "hasActiveFilters"
      | "onReset"
    > {
  filtered: readonly PageRow[]
  needsPageTypeSelection: boolean
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  viewConfig: ViewConfig
  onFiltersChange: (filters: readonly ViewFilter[]) => void
  timelinePropertyOptions: readonly { id: string; label: string }[]
  timelineStartProperty: string | undefined
  timelineEndProperty: string | undefined
  onTimelineStartChange: (id: string) => void
  onTimelineEndChange: (id: string | null) => void
  eligiblePropertyOptions: readonly { id: string; label: string }[]
  pageSize: number
  groupPageSize: number
  itemPageSize: number
  onViewConfigChange: (config: ViewConfig) => void
  creating: boolean
  setCreating: Dispatch<SetStateAction<boolean>>
}

export function PageSystemViewHeader({
  label,
  totalCount,
  filtered,
  canLoadMore,
  hasActiveFilters,
  onReset,
  needsPageTypeSelection,
  search,
  setSearch,
  sortOptions,
  sorts,
  onSortsChange,
  filterDimensions,
  viewConfig,
  onFiltersChange,
  layout,
  onLayoutChange,
  pageTypeOptions,
  pageTypeId,
  onPageTypeChange,
  groupOptions,
  groupBy,
  onGroupByChange,
  groupSorts,
  onGroupSortsChange,
  groupSortOptions,
  defaultGroupSorts,
  groupGranularity,
  onGroupGranularityChange,
  granularityApplicable,
  timelinePropertyOptions,
  timelineStartProperty,
  timelineEndProperty,
  onTimelineStartChange,
  onTimelineEndChange,
  eligiblePropertyOptions,
  visibleProperties,
  hiddenPropertiesOrder,
  alwaysShowProperties,
  onVisibilityChange,
  pageSize,
  groupPageSize,
  itemPageSize,
  onViewConfigChange,
  galleryCoverSource,
  galleryCoverSourceOptions,
  onGalleryCoverSourceChange,
  galleryCardSize,
  onGalleryCardSizeChange,
  notesProperty,
  notesPropertyOptions,
  onNotesPropertyChange,
  creating,
  setCreating,
  onCreatePage,
}: PageSystemViewHeaderProps) {
  return (
    <PageTabHeader
      title={label}
      titleTrailing={
        typeof totalCount === "number" ? (
          <Badge variant="elevation-muted">{totalCount}</Badge>
        ) : (
          <Badge variant="elevation-muted">{`${filtered.length}${canLoadMore ? "+" : ""}`}</Badge>
        )
      }
    >
      <SearchSortFilterRow hasActiveFilters={hasActiveFilters} onReset={onReset}>
        {!needsPageTypeSelection && (
          <>
            <SearchButton value={search} onChange={setSearch} placeholder="Search pages..." />
            <SortButton
              options={sortOptions}
              sorts={sorts.map((s) => ({ field: s.field, direction: s.direction }))}
              onSortsChange={(next) =>
                onSortsChange(next.map((s) => ({ field: s.field, direction: s.direction })))
              }
            />
            <PagesFilterBar
              filterDimensions={filterDimensions}
              filters={viewConfig.filters ?? []}
              onFiltersChange={onFiltersChange}
              hasActiveFilters={(viewConfig.filters ?? []).length > 0}
            />
          </>
        )}
        <ViewSettingsButton
          layout={layout}
          onLayoutChange={onLayoutChange}
          pageTypeOptions={pageTypeOptions}
          pageTypeId={pageTypeId}
          onPageTypeChange={onPageTypeChange}
          groupOptions={groupOptions}
          groupBy={groupBy !== "" ? groupBy : null}
          onGroupByChange={(v) => onGroupByChange(v ?? "")}
          groupSorts={groupSorts.map((s) => ({ field: s.field, direction: s.direction }))}
          onGroupSortsChange={(next) =>
            onGroupSortsChange(next.map((s) => ({ field: s.field, direction: s.direction })))
          }
          groupSortOptions={groupSortOptions}
          defaultGroupSorts={(g) =>
            defaultGroupSorts(g).map((s) => ({
              field: s.field,
              direction: s.direction,
            }))
          }
          groupGranularity={groupGranularity}
          onGroupGranularityChange={onGroupGranularityChange}
          granularityApplicable={granularityApplicable}
          timelinePropertyOptions={timelinePropertyOptions}
          timelineStartProperty={timelineStartProperty}
          timelineEndProperty={timelineEndProperty}
          onTimelineStartChange={onTimelineStartChange}
          onTimelineEndChange={onTimelineEndChange}
          eligiblePropertyOptions={eligiblePropertyOptions}
          visibleProperties={visibleProperties}
          hiddenPropertiesOrder={hiddenPropertiesOrder}
          alwaysShowProperties={alwaysShowProperties}
          onVisibilityChange={onVisibilityChange}
          pageSize={pageSize}
          groupPageSize={groupPageSize}
          itemPageSize={itemPageSize}
          onPageSizeChange={(n) => onViewConfigChange({ ...viewConfig, pageSize: n })}
          onGroupPageSizeChange={(n) => onViewConfigChange({ ...viewConfig, groupPageSize: n })}
          onItemPageSizeChange={(n) => onViewConfigChange({ ...viewConfig, itemPageSize: n })}
          galleryCoverSource={galleryCoverSource}
          galleryCoverSourceOptions={galleryCoverSourceOptions}
          onGalleryCoverSourceChange={onGalleryCoverSourceChange}
          galleryCardSize={galleryCardSize}
          onGalleryCardSizeChange={onGalleryCardSizeChange}
          notesProperty={notesProperty}
          notesPropertyOptions={notesPropertyOptions}
          onNotesPropertyChange={onNotesPropertyChange}
        />
        {onCreatePage && !needsPageTypeSelection && (
          <CreatePageButton
            disabled={creating}
            onClick={async () => {
              if (creating) return
              setCreating(true)
              try {
                await onCreatePage()
              } finally {
                setCreating(false)
              }
            }}
          />
        )}
      </SearchSortFilterRow>
    </PageTabHeader>
  )
}
