import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Icon } from "../../temper/things/properties/icon.text-property.ts"
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

export const nav = {
  id: "01a0680e-5e00-7007-a253-4c7d9b1a5108",
  pageTypeSlug: "page-type",
  slug: "nav",
  definition: "one item in an app's navigation, and the views beneath it",
  pluralSlug: "navs",
  extends: ["page-type/page"],
  parts: [
    "boolean-property/show-count-badge",
    "number-property/draw-cost",
    "number-property/mobile-pin-order",
    "number-property/nav-place",
    "relation-property/nav-parent",
    "text-property/back-href",
    "text-property/nav-app-slug",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/icon", required: true, many: false },
    { pageProperty: "number-property/nav-place", required: true, many: false },
    { pageProperty: "text-property/nav-app-slug", required: false, many: false },
    { pageProperty: "relation-property/nav-parent", required: false, many: false },
    { pageProperty: "number-property/mobile-pin-order", required: false, many: false },
    { pageProperty: "text-property/back-href", required: false, many: false },
    { pageProperty: "number-property/draw-cost", required: false, many: false },
    { pageProperty: "boolean-property/show-count-badge", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A nav item belongs to one app.",
    },
    {
      invariantKind: "departure",
      statement: "An app's navigation is every nav item naming that app.",
    },
    {
      invariantKind: "departure",
      statement: "A nav item has the order that nav item sits in among its siblings.",
    },
    {
      invariantKind: "departure",
      statement:
        "A person reorders and renames nav items from the interface that draws those items.",
    },
    {
      invariantKind: "departure",
      statement: "A nav item's values are written by the browser rather than authored.",
    },
    {
      invariantKind: "departure",
      statement: "A nav item is found by slug rather than by a marker key with a constant.",
    },
  ],
} as const satisfies PageType
