"use client"

import { createGenericLayout } from "@akasha/design-layout/column-layout"
import { LoadMoreButton } from "@akasha/design-layout/load-more-button"
import { ResponsiveColumnsSkeleton } from "@akasha/design-layout/responsive-columns-skeleton"
import { CollapsibleGroupSection } from "@akasha/design-patterns/collapsible-group-section"
import { type useCollapsedGroups } from "@akasha/design-patterns/use-collapsed-groups"
import type { Dispatch, SetStateAction } from "react"
import type { PageRow } from "@akasha/pages-ui-components/view-engine/view-row"
import { PageBoard } from "@akasha/pages-ui-components/page-board"
import { PageCalendar } from "@akasha/pages-ui-components/page-calendar"
import { PageListSection } from "./page-list-section"
import { PageViewEmpty, TimelineLayoutBody } from "./page-system-view-helpers"
import type { PageSystemTabContentProps, ServerGroupedSection } from "@akasha/pages-ui-components/page-system-tab-content-props"
import type { withColumnWidths } from "@akasha/pages-ui-components/page-table-widths"
import type { useBoardViewWiring } from "@akasha/pages-ui-components/use-board-view-wiring"
import type { useCalendarViewWiring } from "@akasha/pages-ui-components/use-calendar-view-wiring"

export interface PageSystemViewBodyProps
  extends Pick<
    PageSystemTabContentProps,
    | "serverGrouped"
    | "layout"
    | "renderItem"
    | "renderRow"
    | "onReorderColumns"
    | "onReorderCards"
    | "hasRowActions"
    | "onLoadMore"
    | "canLoadMore"
    | "properties"
    | "visibleProperties"
    | "galleryCardSize"
  > {
  needsPageTypeSelection: boolean
  showLoadingSkeleton: boolean
  isNarrowed: boolean
  filtered: readonly PageRow[]
  calendar: ReturnType<typeof useCalendarViewWiring>
  board: ReturnType<typeof useBoardViewWiring>
  collapsed: ReturnType<typeof useCollapsedGroups>
  localCalendarDateBy: string | undefined
  visibleGroups: readonly ServerGroupedSection[] | undefined
  sortedServerGrouped: readonly ServerGroupedSection[] | undefined
  hasMoreGroups: boolean
  visibleGroupCount: number
  setVisibleGroupCount: Dispatch<SetStateAction<number>>
  groupedTableColumns: ReturnType<typeof withColumnWidths>
  localTimelineStartProperty: string | undefined
  localTimelineEndProperty: string | undefined
  localPageSize: number
  localGroupPageSize: number
  localItemPageSize: number
  paginationResetKey: string
}

export function PageSystemViewBody({
  needsPageTypeSelection,
  showLoadingSkeleton,
  isNarrowed,
  filtered,
  serverGrouped,
  layout,
  renderItem,
  renderRow,
  onReorderColumns,
  onReorderCards,
  hasRowActions,
  onLoadMore,
  canLoadMore,
  properties,
  visibleProperties,
  galleryCardSize,
  calendar,
  board,
  collapsed,
  localCalendarDateBy,
  visibleGroups,
  sortedServerGrouped,
  hasMoreGroups,
  visibleGroupCount,
  setVisibleGroupCount,
  groupedTableColumns,
  localTimelineStartProperty,
  localTimelineEndProperty,
  localPageSize,
  localGroupPageSize,
  localItemPageSize,
  paginationResetKey,
}: PageSystemViewBodyProps) {
  const flatListSection = (
    <PageListSection
      layout={layout}
      items={filtered}
      renderItem={renderItem}
      renderRow={renderRow}
      onReorderColumns={onReorderColumns}
      onReorderCards={onReorderCards}
      hasRowActions={hasRowActions}
      definitions={properties}
      visibleProperties={visibleProperties}
      galleryCardSize={galleryCardSize}
      pageSize={localPageSize}
      resetKey={paginationResetKey}
      onServerLoadMore={onLoadMore ? () => onLoadMore(localPageSize) : undefined}
      canServerLoadMore={canLoadMore}
      serverPrefetchPages={2}
    />
  )
  return needsPageTypeSelection ? (
    <PageViewEmpty title="No page type selected" description="Select a page type to get started." />
  ) : showLoadingSkeleton ? (
    <ResponsiveColumnsSkeleton layout={createGenericLayout()} />
  ) : filtered.length === 0 && (serverGrouped?.length ?? 0) === 0 && isNarrowed ? (
    <PageViewEmpty title="No matches" description="No pages match the current filters." />
  ) : filtered.length === 0 && (serverGrouped?.length ?? 0) === 0 ? (
    <PageViewEmpty title="No pages yet" description="Nothing has been added here yet." />
  ) : layout === "calendar" ? (
    <PageCalendar
      items={filtered}
      dateProperty={calendar.dateProperty}
      renderItem={renderItem}
      draggable={calendar.draggable}
      onReschedule={calendar.onReschedule}
      onQuickAdd={calendar.onQuickAdd}
      dateOptions={calendar.dateOptions}
      calendarDateBy={localCalendarDateBy ?? null}
      onCalendarDateByChange={calendar.onCalendarDateByChange}
    />
  ) : layout === "board" ? (
    visibleGroups && visibleGroups.length > 0 ? (
      <>
        <PageBoard
          groups={visibleGroups}
          renderItem={renderItem}
          onCardDrop={board.onCardDrop}
          draggable={board.draggable}
          itemPageSize={localItemPageSize}
        />
        {hasMoreGroups && sortedServerGrouped && (
          <LoadMoreButton
            visibleCount={visibleGroupCount}
            totalCount={sortedServerGrouped.length}
            onLoadMore={() => setVisibleGroupCount((c) => c + localGroupPageSize)}
          />
        )}
      </>
    ) : (
      flatListSection
    )
  ) : layout === "timeline" ? (
    <TimelineLayoutBody
      rows={filtered}
      startPropertyId={localTimelineStartProperty}
      endPropertyId={localTimelineEndProperty}
      renderItem={renderItem}
    />
  ) : visibleGroups && visibleGroups.length > 0 ? (
    <div className="flex flex-col gap-6">
      {visibleGroups.map((group) => (
        <CollapsibleGroupSection
          key={group.key}
          groupKey={group.key}
          label={group.label}
          count={group.totalCount ?? group.items.length}
          open={collapsed.isOpen(group.key)}
          onOpenChange={(open) => collapsed.setOpen(group.key, open)}
        >
          <PageListSection
            layout={layout}
            items={group.items}
            renderItem={renderItem}
            renderRow={renderRow}
            onReorderColumns={onReorderColumns}
            hasRowActions={hasRowActions}
            definitions={properties}
            columns={layout === "table" ? groupedTableColumns : undefined}
            visibleProperties={visibleProperties}
            galleryCardSize={galleryCardSize}
            pageSize={localItemPageSize}
            resetKey={paginationResetKey}
            onServerLoadMore={group.loadMore}
            canServerLoadMore={group.canLoadMore}
          />
        </CollapsibleGroupSection>
      ))}
      {hasMoreGroups && sortedServerGrouped && (
        <LoadMoreButton
          visibleCount={visibleGroupCount}
          totalCount={sortedServerGrouped.length}
          onLoadMore={() => setVisibleGroupCount((c) => c + localGroupPageSize)}
        />
      )}
    </div>
  ) : (
    flatListSection
  )
}
