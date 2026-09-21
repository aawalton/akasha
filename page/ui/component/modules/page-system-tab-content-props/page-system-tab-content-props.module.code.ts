import type {
  PageTypePropertiesMap,
  PropertyDefinition,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type {
  ViewConfig,
  ViewFilter,
  ViewLayout,
  VisibilityChange,
} from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import type { GalleryCardSize } from "akasha/page/core/view/modules/gallery/gallery.module.code.ts"
import type { ReorderCardsHandler } from "akasha/page/ui/component/modules/use-reorder-view-wiring/use-reorder-view-wiring.module.code.ts"
import type { PageTypeOption } from "akasha/page/ui/component/modules/view-settings-options/view-settings-options.module.code.ts"
import type { PageRow } from "akasha/page/ui/component/view-engine/modules/view-row/view-row.module.code.ts"
import type { ReactNode } from "react"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

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
