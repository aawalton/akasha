"use client"

import { Button } from "@akasha/design-primitives/button"
import { FilterableList, FilterableListItem } from "@akasha/design-primitives/filterable-list"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { SubView } from "@akasha/design-primitives/sub-view"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { GalleryOptionsPicker } from "@akasha/pages-ui-components/gallery-options-picker"
import { GroupByPicker } from "@akasha/pages-ui-components/group-by-picker"
import { NotesOptionsPicker } from "@akasha/pages-ui-components/notes-options-picker"
import { PageSizePicker } from "@akasha/pages-ui-components/page-size-picker"
import { PropertyVisibilityPicker } from "@akasha/pages-ui-components/property-visibility-picker"
import { TimelinePicker } from "@akasha/pages-ui-components/timeline-picker"
import {
  DEFAULT_LAYOUT,
  LAYOUT_OPTIONS,
  type ViewSettingsButtonProps,
  type ViewSettingsView,
} from "@akasha/pages-ui-components/view-settings-options"
import {
  ChevronRight,
  Eye,
  GanttChart,
  Group,
  Hash,
  Images,
  LayoutDashboard,
  LayoutGrid,
  type LucideIcon,
  NotebookText,
  Settings2,
} from "lucide-react"
import { useState } from "react"

function SettingsMenuButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: LucideIcon
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-secondary text-sm transition-colors hover:bg-hover hover:text-primary"
      onClick={onClick}
    >
      <Icon className="size-4 shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      <ChevronRight className="size-4 shrink-0 text-tertiary" />
    </button>
  )
}

export function ViewSettingsButton({
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
  onPageSizeChange,
  onGroupPageSizeChange,
  onItemPageSizeChange,
  galleryCoverSource,
  galleryCoverSourceOptions,
  onGalleryCoverSourceChange,
  galleryCardSize,
  onGalleryCardSizeChange,
  notesProperty,
  notesPropertyOptions,
  onNotesPropertyChange,
}: ViewSettingsButtonProps) {
  const surface = useSurface()
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [view, setView] = useState<ViewSettingsView>("menu")

  const hasLayout = onLayoutChange != null
  const hasGalleryOptions =
    layout === "gallery" && (onGalleryCardSizeChange != null || onGalleryCoverSourceChange != null)
  const hasNotesOptions = layout === "notes" && onNotesPropertyChange != null
  const hasPageType =
    pageTypeOptions != null && pageTypeOptions.length > 0 && onPageTypeChange != null
  const hasGroup = groupOptions.length > 0
  const hasTimeline = onTimelineStartChange != null && layout === "timeline"
  const hasPropertyVisibility =
    eligiblePropertyOptions != null &&
    eligiblePropertyOptions.length > 0 &&
    onVisibilityChange != null

  const handleOpenChange = (open: boolean) => {
    setPopoverOpen(open)
    if (!open) setView("menu")
  }

  const menuView = (
    <div className="flex flex-col gap-1">
      {hasLayout && (
        <SettingsMenuButton
          icon={LayoutDashboard}
          label="Layout"
          onClick={() => setView("layout")}
        />
      )}
      {hasGalleryOptions && (
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-secondary text-sm transition-colors hover:bg-hover hover:text-primary"
          onClick={() => setView("gallery")}
        >
          <Images className="size-4 shrink-0" />
          <span className="flex-1 text-left">Gallery</span>
          <ChevronRight className="size-4 shrink-0 text-tertiary" />
        </button>
      )}
      {hasNotesOptions && (
        <SettingsMenuButton icon={NotebookText} label="Notes" onClick={() => setView("notes")} />
      )}
      {hasPageType && (
        <SettingsMenuButton
          icon={LayoutGrid}
          label="Page Type"
          onClick={() => setView("pageType")}
        />
      )}
      {hasGroup && (
        <SettingsMenuButton icon={Group} label="Group By" onClick={() => setView("groupBy")} />
      )}
      {hasTimeline && (
        <SettingsMenuButton
          icon={GanttChart}
          label="Timeline"
          onClick={() => setView("timeline")}
        />
      )}
      {hasPropertyVisibility && (
        <SettingsMenuButton
          icon={Eye}
          label="Property Visibility"
          onClick={() => setView("propertyVisibility")}
        />
      )}
      <SettingsMenuButton icon={Hash} label="Page Size" onClick={() => setView("pageSize")} />
    </div>
  )

  const layoutView =
    hasLayout && onLayoutChange !== undefined ? (
      <SubView title="Layout" onBack={() => setView("menu")}>
        <FilterableList>
          {LAYOUT_OPTIONS.map((option) => (
            <FilterableListItem
              key={option.id}
              selected={option.id === (layout ?? DEFAULT_LAYOUT)}
              onSelect={() => onLayoutChange(option.id)}
            >
              {option.name}
            </FilterableListItem>
          ))}
        </FilterableList>
      </SubView>
    ) : null

  const pageTypeView =
    hasPageType && pageTypeOptions !== undefined && onPageTypeChange !== undefined ? (
      <SubView title="Page Type" onBack={() => setView("menu")}>
        <FilterableList>
          {pageTypeOptions.map((option) => (
            <FilterableListItem
              key={option.id}
              selected={option.id === pageTypeId}
              onSelect={() => onPageTypeChange(option.id)}
            >
              {option.name}
            </FilterableListItem>
          ))}
        </FilterableList>
      </SubView>
    ) : null

  const groupByView = (
    <GroupByPicker
      groupBy={groupBy}
      groupOptions={groupOptions}
      onGroupByChange={onGroupByChange}
      groupSorts={groupSorts}
      onGroupSortsChange={onGroupSortsChange}
      groupSortOptions={groupSortOptions}
      defaultGroupSorts={defaultGroupSorts}
      groupGranularity={groupGranularity}
      onGroupGranularityChange={onGroupGranularityChange}
      granularityApplicable={granularityApplicable}
      onBack={() => setView("menu")}
    />
  )

  const timelineView =
    hasTimeline && onTimelineStartChange !== undefined && onTimelineEndChange !== undefined ? (
      <TimelinePicker
        propertyOptions={timelinePropertyOptions ?? []}
        startProperty={timelineStartProperty}
        endProperty={timelineEndProperty}
        onStartChange={onTimelineStartChange}
        onEndChange={onTimelineEndChange}
        onBack={() => setView("menu")}
      />
    ) : null

  const propertyVisibilityView =
    hasPropertyVisibility &&
    onVisibilityChange !== undefined &&
    eligiblePropertyOptions !== undefined ? (
      <PropertyVisibilityPicker
        eligibleOptions={eligiblePropertyOptions}
        visibleProperties={visibleProperties ?? []}
        hiddenPropertiesOrder={hiddenPropertiesOrder}
        alwaysShowProperties={alwaysShowProperties}
        onVisibilityChange={onVisibilityChange}
        onBack={() => setView("menu")}
      />
    ) : null

  const galleryView = hasGalleryOptions ? (
    <GalleryOptionsPicker
      coverSource={galleryCoverSource}
      coverSourceOptions={galleryCoverSourceOptions}
      onCoverSourceChange={onGalleryCoverSourceChange}
      cardSize={galleryCardSize}
      onCardSizeChange={onGalleryCardSizeChange}
      onBack={() => setView("menu")}
    />
  ) : null

  const notesView = hasNotesOptions ? (
    <NotesOptionsPicker
      notesProperty={notesProperty}
      notesPropertyOptions={notesPropertyOptions}
      onNotesPropertyChange={onNotesPropertyChange}
      onBack={() => setView("menu")}
    />
  ) : null

  const pageSizeView = (
    <PageSizePicker
      groupBy={groupBy}
      pageSize={pageSize}
      groupPageSize={groupPageSize}
      itemPageSize={itemPageSize}
      onPageSizeChange={onPageSizeChange}
      onGroupPageSizeChange={onGroupPageSizeChange}
      onItemPageSizeChange={onItemPageSizeChange}
      onBack={() => setView("menu")}
    />
  )

  return (
    <Popover open={popoverOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="tertiary"
          size="icon"
          className={surfaceClass(surface + 1)}
          aria-label="View settings"
        >
          <Settings2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-52">
        {view === "menu" && menuView}
        {view === "layout" && layoutView}
        {view === "gallery" && galleryView}
        {view === "notes" && notesView}
        {view === "pageType" && pageTypeView}
        {view === "groupBy" && groupByView}
        {view === "timeline" && timelineView}
        {view === "propertyVisibility" && propertyVisibilityView}
        {view === "pageSize" && pageSizeView}
      </PopoverContent>
    </Popover>
  )
}
