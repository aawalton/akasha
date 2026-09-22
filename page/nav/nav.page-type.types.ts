import type { BackHref } from "akasha/page/nav/properties/back-href.text-property.types.ts"
import type { DrawCost } from "akasha/page/nav/properties/draw-cost.number-property.types.ts"
import type { MobilePinOrder } from "akasha/page/nav/properties/mobile-pin-order.number-property.types.ts"
import type { NavApp } from "akasha/page/nav/properties/nav-app.relation-property.types.ts"
import type { NavParent } from "akasha/page/nav/properties/nav-parent.relation-property.types.ts"
import type { NavPlace } from "akasha/page/nav/properties/nav-place.number-property.types.ts"
import type { ShowCountBadge } from "akasha/page/nav/properties/show-count-badge.boolean-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { Icon } from "akasha/temper/thing/properties/icon.text-property.types.ts"

export type Nav = Page & {
  title: Title
  icon: Icon
  navPlace: NavPlace
  app?: NavApp
  navParent?: NavParent
  mobilePinOrder?: MobilePinOrder
  backHref?: BackHref
  drawCost?: DrawCost
  showCountBadge?: ShowCountBadge
}
