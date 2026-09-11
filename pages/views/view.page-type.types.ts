import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"
import type { AlwaysShowProperties } from "akasha/pages/views/properties/always-show-properties.text-property.ts"
import type { GalleryCardSize } from "akasha/pages/views/properties/gallery-card-size.select-property.types.ts"
import type { GalleryCoverSource } from "akasha/pages/views/properties/gallery-cover-source.text-property.ts"
import type { GroupBy } from "akasha/pages/views/properties/group-by.text-property.ts"
import type { GroupGranularity } from "akasha/pages/views/properties/group-granularity.select-property.types.ts"
import type { GroupPageSize } from "akasha/pages/views/properties/group-page-size.number-property.types.ts"
import type { GroupSorts } from "akasha/pages/views/properties/group-sorts.record-property.ts"
import type { HiddenPropertiesOrder } from "akasha/pages/views/properties/hidden-properties-order.text-property.ts"
import type { ItemPageSize } from "akasha/pages/views/properties/item-page-size.number-property.types.ts"
import type { Layout } from "akasha/pages/views/properties/layout.select-property.types.ts"
import type { LiveRefreshMs } from "akasha/pages/views/properties/live-refresh-ms.number-property.types.ts"
import type { LockedPageType } from "akasha/pages/views/properties/locked-page-type.boolean-property.types.ts"
import type { Narrows } from "akasha/pages/views/properties/narrows.record-property.ts"
import type { Nav } from "akasha/pages/views/properties/nav.relation-property.types.ts"
import type { PageSize } from "akasha/pages/views/properties/page-size.number-property.types.ts"
import type { ReorderCommand } from "akasha/pages/views/properties/reorder-command.text-property.ts"
import type { ViewPageType } from "akasha/pages/views/properties/view-page-type.relation-property.types.ts"
import type { ViewPlace } from "akasha/pages/views/properties/view-place.number-property.types.ts"
import type { ViewPredicate } from "akasha/pages/views/properties/view-predicate.text-property.ts"
import type { ViewSorts } from "akasha/pages/views/properties/view-sorts.record-property.ts"
import type { VisibleProperties } from "akasha/pages/views/properties/visible-properties.text-property.ts"

export type View = Page & {
  title: Title
  nav: Nav
  pageType?: ViewPageType
  viewPredicate?: ViewPredicate
  viewPlace?: ViewPlace
  layout?: Layout
  narrows?: Narrows
  viewSorts?: ViewSorts
  groupBy?: GroupBy
  groupSorts?: GroupSorts
  groupGranularity?: GroupGranularity
  visibleProperties?: VisibleProperties
  alwaysShowProperties?: AlwaysShowProperties
  hiddenPropertiesOrder?: HiddenPropertiesOrder
  pageSize?: PageSize
  itemPageSize?: ItemPageSize
  groupPageSize?: GroupPageSize
  galleryCoverSource?: GalleryCoverSource
  galleryCardSize?: GalleryCardSize
  reorderCommand?: ReorderCommand
  liveRefreshMs?: LiveRefreshMs
  lockedPageType?: LockedPageType
}
