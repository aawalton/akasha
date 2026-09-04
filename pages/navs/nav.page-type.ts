import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Icon } from "../../temper/temper-things/properties/icon.text-property.ts"
import type { Title } from "../pages/properties/title.text-property.ts"
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
  extendsSlug: "page-type/page",
  partSlugs: [
    "boolean-property/show-count-badge",
    "number-property/draw-cost",
    "number-property/mobile-pin-order",
    "number-property/nav-place",
    "relation-property/nav-parent",
    "text-property/back-href",
    "text-property/nav-app-slug",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "icon", required: true, many: false },
    { pagePropertySlug: "nav-place", required: true, many: false },
    { pagePropertySlug: "nav-app-slug", required: false, many: false },
    { pagePropertySlug: "nav-parent", required: false, many: false },
    { pagePropertySlug: "mobile-pin-order", required: false, many: false },
    { pagePropertySlug: "back-href", required: false, many: false },
    { pagePropertySlug: "draw-cost", required: false, many: false },
    { pagePropertySlug: "show-count-badge", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A nav item belongs to one app, and an app's navigation is every nav item naming it.",
    },
    {
      invariantKind: "departure",
      statement: "A nav item carries the order it sits in among its siblings.",
    },
    {
      invariantKind: "departure",
      statement:
        "A person reorders and renames nav items from the interface that draws them, so their values are written by the browser rather than authored.",
    },
    {
      invariantKind: "departure",
      statement: "A nav item is found by slug rather than by a marker key holding a constant.",
    },
  ],
} as const satisfies PageType
