import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { AlwaysShowProperties } from "akasha/page/view/properties/always-show-properties.text-property.types.ts"
import type { GalleryCardSize } from "akasha/page/view/properties/gallery-card-size.select-property.types.ts"
import type { GalleryCoverSource } from "akasha/page/view/properties/gallery-cover-source.text-property.types.ts"
import type { GroupBy } from "akasha/page/view/properties/group-by.text-property.types.ts"
import type { GroupGranularity } from "akasha/page/view/properties/group-granularity.select-property.types.ts"
import type { GroupPageSize } from "akasha/page/view/properties/group-page-size.number-property.types.ts"
import type { GroupSorts } from "akasha/page/view/properties/group-sorts.record-property.types.ts"
import type { HiddenPropertiesOrder } from "akasha/page/view/properties/hidden-properties-order.text-property.types.ts"
import type { ItemPageSize } from "akasha/page/view/properties/item-page-size.number-property.types.ts"
import type { Layout } from "akasha/page/view/properties/layout.select-property.types.ts"
import type { LockedPageType } from "akasha/page/view/properties/locked-page-type.boolean-property.types.ts"
import type { Narrows } from "akasha/page/view/properties/narrows.record-property.types.ts"
import type { Nav } from "akasha/page/view/properties/nav.relation-property.types.ts"
import type { PageSize } from "akasha/page/view/properties/page-size.number-property.types.ts"
import type { ReorderCommand } from "akasha/page/view/properties/reorder-command.text-property.types.ts"
import type { ViewPageType } from "akasha/page/view/properties/view-page-type.relation-property.types.ts"
import type { ViewPlace } from "akasha/page/view/properties/view-place.number-property.types.ts"
import type { ViewPredicate } from "akasha/page/view/properties/view-predicate.text-property.types.ts"
import type { ViewSorts } from "akasha/page/view/properties/view-sorts.record-property.types.ts"
import type { VisibleProperties } from "akasha/page/view/properties/visible-properties.text-property.types.ts"

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
  lockedPageType?: LockedPageType
}
