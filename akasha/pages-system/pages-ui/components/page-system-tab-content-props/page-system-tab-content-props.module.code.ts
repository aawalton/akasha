import type { PageTypePropertiesMap } from "@akasha/pages-core/property-types/rollup"
import type {
  ViewConfig,
  ViewFilter,
  ViewLayout,
  VisibilityChange,
} from "@akasha/pages-core/schema/view-data"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import type { GalleryCardSize } from "@akasha/pages-core/view/gallery"
import type { ReorderCardsHandler } from "@akasha/pages-ui-components/use-reorder-view-wiring"
import type { PageRow } from "@akasha/pages-ui-components/view-engine/view-row"
import type { PageTypeOption } from "@akasha/pages-ui-components/view-settings-options"
import type { ReactNode } from "react"

export interface ServerGroupedSection {
  key: string
  label: string
  items: readonly PageRow[]
  canLoadMore?: boolean
  loadMore?: () => void
  totalCount?: number | null
}

export interface PageSystemTabContentProps {
  items: readonly PageRow[]
  label: string
  properties: readonly PropertyDefinition[]
  renderItem: (item: PageRow) => ReactNode
  renderRow?: (item: PageRow) => ReactNode
  onReorderColumns?: (orderedColumnIds: readonly string[]) => void
  onReorderCards?: ReorderCardsHandler
  hasRowActions?: boolean
  searchField?: string
  storagePrefix?: string
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
  onConfigChange?: (config: ViewConfig) => void
  onLoadMore?: (numItems: number) => void
  canLoadMore?: boolean
  layout?: ViewLayout
  onLayoutChange?: (layout: ViewLayout) => void
  pageTypeId?: string
  pageTypeSlug?: string
  onPageTypeChange?: (pageTypeId: string) => void
  pageTypeOptions?: readonly PageTypeOption[]
  isCrossType?: boolean
  totalCount?: number | null
  onCreatePage?: (seed?: Record<string, string | number | boolean | null>) => void | Promise<void>
  serverGrouped?: readonly ServerGroupedSection[]
  isLoading?: boolean
  propertiesByPageType?: PageTypePropertiesMap
  visibleProperties?: readonly string[]
  hiddenPropertiesOrder?: readonly string[]
  alwaysShowProperties?: readonly string[]
  onVisibilityChange?: (next: VisibilityChange) => void
  onPropertyPatch?: (pageId: string, propertyId: string, value: unknown) => void
  galleryCardSize?: GalleryCardSize
  galleryCoverSource?: string
  galleryCoverSourceOptions?: readonly { id: string; label: string }[]
  onGalleryCoverSourceChange?: (propertyId: string | null) => void
  onGalleryCardSizeChange?: (size: GalleryCardSize) => void
  notesProperty?: string
  notesPropertyOptions?: readonly { id: string; label: string }[]
  onNotesPropertyChange?: (propertyId: string | null) => void
  embedded?: boolean
}
