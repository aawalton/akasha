import type { Page } from "../page.page-type.types.ts"
import type { Title } from "../properties/title.text-property.ts"
import type { Narrows } from "../queries/properties/narrows.record-property.ts"
import type { AlwaysShowProperties } from "./properties/always-show-properties.text-property.ts"
import type { GalleryCardSize } from "./properties/gallery-card-size.select-property.ts"
import type { GalleryCoverSource } from "./properties/gallery-cover-source.text-property.ts"
import type { GroupBy } from "./properties/group-by.text-property.ts"
import type { GroupGranularity } from "./properties/group-granularity.select-property.ts"
import type { GroupPageSize } from "./properties/group-page-size.number-property.ts"
import type { GroupSorts } from "./properties/group-sorts.record-property.ts"
import type { HiddenPropertiesOrder } from "./properties/hidden-properties-order.text-property.ts"
import type { ItemPageSize } from "./properties/item-page-size.number-property.ts"
import type { Layout } from "./properties/layout.select-property.ts"
import type { LiveRefreshMs } from "./properties/live-refresh-ms.number-property.ts"
import type { LockedPageType } from "./properties/locked-page-type.boolean-property.ts"
import type { Nav } from "./properties/nav.relation-property.ts"
import type { PageSize } from "./properties/page-size.number-property.ts"
import type { ReorderCommand } from "./properties/reorder-command.text-property.ts"
import type { ViewPageType } from "./properties/view-page-type.relation-property.ts"
import type { ViewPlace } from "./properties/view-place.number-property.ts"
import type { ViewPredicate } from "./properties/view-predicate.text-property.ts"
import type { ViewSorts } from "./properties/view-sorts.record-property.ts"
import type { VisibleProperties } from "./properties/visible-properties.text-property.ts"

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
