import type { Icon } from "../../temper/things/properties/icon.text-property.ts"
import type { Page } from "../page.page-type.types.ts"
import type { Title } from "../properties/title.text-property.ts"
import type { BackHref } from "./properties/back-href.text-property.ts"
import type { DrawCost } from "./properties/draw-cost.number-property.ts"
import type { MobilePinOrder } from "./properties/mobile-pin-order.number-property.ts"
import type { NavAppSlug } from "./properties/nav-app-slug.text-property.ts"
import type { NavParent } from "./properties/nav-parent.relation-property.ts"
import type { NavPlace } from "./properties/nav-place.number-property.ts"
import type { ShowCountBadge } from "./properties/show-count-badge.boolean-property.ts"

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
