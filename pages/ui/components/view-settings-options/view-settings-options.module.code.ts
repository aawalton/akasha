import type { GroupOption } from "@akasha/design-patterns/group-button"
import type { SortEntry, SortOption } from "@akasha/design-patterns/sort-types"
import type {
  GroupGranularity,
  ViewLayout,
  VisibilityChange,
} from "@akasha/pages-core/schema/view-data"
import type { GalleryCardSize } from "@akasha/pages-core/view/gallery"

export interface PageTypeOption {
  id: string
  name: string
}

export interface LayoutOption {
  id: ViewLayout
  name: string
}

export const LAYOUT_OPTIONS: readonly LayoutOption[] = [
  { id: "cards", name: "Cards" },
  { id: "table", name: "Table" },
  { id: "board", name: "Board" },
  { id: "calendar", name: "Calendar" },
  { id: "gallery", name: "Gallery" },
  { id: "notes", name: "Notes" },
  { id: "timeline", name: "Timeline" },
]

export const DEFAULT_LAYOUT: ViewLayout = "cards"

export type ViewSettingsView =
  | "menu"
  | "layout"
  | "pageType"
  | "groupBy"
  | "timeline"
  | "propertyVisibility"
  | "pageSize"
  | "gallery"
  | "notes"

export interface ViewSettingsButtonProps {
  layout?: ViewLayout
  onLayoutChange?: (layout: ViewLayout) => void
  pageTypeOptions?: readonly PageTypeOption[]
  pageTypeId?: string
  onPageTypeChange?: (id: string) => void
  groupOptions: readonly GroupOption[]
  groupBy: string | null
  onGroupByChange: (value: string | null) => void
  groupSorts: readonly SortEntry[]
  onGroupSortsChange: (sorts: readonly SortEntry[]) => void
  groupSortOptions: readonly SortOption[]
  defaultGroupSorts: readonly SortEntry[] | ((groupValue: string) => readonly SortEntry[])
  groupGranularity?: GroupGranularity
  onGroupGranularityChange?: (granularity: GroupGranularity) => void
  granularityApplicable?: boolean
  timelinePropertyOptions?: readonly { id: string; label: string }[]
  timelineStartProperty?: string
  timelineEndProperty?: string
  onTimelineStartChange?: (id: string) => void
  onTimelineEndChange?: (id: string | null) => void
  eligiblePropertyOptions?: readonly { id: string; label: string }[]
  visibleProperties?: readonly string[]
  hiddenPropertiesOrder?: readonly string[]
  alwaysShowProperties?: readonly string[]
  onVisibilityChange?: (next: VisibilityChange) => void
  pageSize?: number
  groupPageSize?: number
  itemPageSize?: number
  onPageSizeChange?: (value: number) => void
  onGroupPageSizeChange?: (value: number) => void
  onItemPageSizeChange?: (value: number) => void
  galleryCoverSource?: string
  galleryCoverSourceOptions?: readonly { id: string; label: string }[]
  onGalleryCoverSourceChange?: (propertyId: string | null) => void
  galleryCardSize?: GalleryCardSize
  onGalleryCardSizeChange?: (size: GalleryCardSize) => void
  notesProperty?: string
  notesPropertyOptions?: readonly { id: string; label: string }[]
  onNotesPropertyChange?: (propertyId: string | null) => void
}
