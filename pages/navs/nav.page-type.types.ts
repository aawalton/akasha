import type { BackHref } from "akasha/pages/navs/properties/back-href.text-property.ts"
import type { DrawCost } from "akasha/pages/navs/properties/draw-cost.number-property.types.ts"
import type { MobilePinOrder } from "akasha/pages/navs/properties/mobile-pin-order.number-property.types.ts"
import type { NavAppSlug } from "akasha/pages/navs/properties/nav-app-slug.text-property.ts"
import type { NavParent } from "akasha/pages/navs/properties/nav-parent.relation-property.types.ts"
import type { NavPlace } from "akasha/pages/navs/properties/nav-place.number-property.types.ts"
import type { ShowCountBadge } from "akasha/pages/navs/properties/show-count-badge.boolean-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"
import type { Icon } from "akasha/temper/things/properties/icon.text-property.types.ts"

export type Nav = Page & {
  title: Title
  icon: Icon
  navPlace: NavPlace
  appSlug?: NavAppSlug
  navParent?: NavParent
  mobilePinOrder?: MobilePinOrder
  backHref?: BackHref
  drawCost?: DrawCost
  showCountBadge?: ShowCountBadge
}
