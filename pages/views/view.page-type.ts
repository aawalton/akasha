import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Narrows } from "../page-queries/properties/narrows.record-property.ts"
import type { Title } from "../properties/title.text-property.ts"
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
import type { NavSlug } from "./properties/nav-slug.relation-property.ts"
import type { PageSize } from "./properties/page-size.number-property.ts"
import type { ReorderCommand } from "./properties/reorder-command.text-property.ts"
import type { ViewPlace } from "./properties/view-place.number-property.ts"
import type { ViewPredicate } from "./properties/view-predicate.text-property.ts"
import type { ViewSorts } from "./properties/view-sorts.record-property.ts"
import type { VisibleProperties } from "./properties/visible-properties.text-property.ts"

export type View = Page & {
  title: Title
  navSlug: NavSlug
  viewPredicate?: ViewPredicate
  viewPlace?: ViewPlace
  layout?: Layout
  narrows?: Narrows
  viewSorts?: ViewSorts
  groupBy?: GroupBy
  groupSorts?: GroupSorts
  groupGranularity?: GroupGranularity
  visibleProperties?: readonly VisibleProperties[]
  alwaysShowProperties?: readonly AlwaysShowProperties[]
  hiddenPropertiesOrder?: readonly HiddenPropertiesOrder[]
  pageSize?: PageSize
  itemPageSize?: ItemPageSize
  groupPageSize?: GroupPageSize
  galleryCoverSource?: GalleryCoverSource
  galleryCardSize?: GalleryCardSize
  reorderCommand?: ReorderCommand
  liveRefreshMs?: LiveRefreshMs
  lockedPageType?: LockedPageType
}

export const view = {
  id: "01a0680d-4d00-7016-9f27-3b8a5d6c4117",
  pageTypeSlug: "page-type",
  slug: "view",
  definition: "one arrangement of the pages of a type, as a person has set it up",
  pluralSlug: "views",
  extendsSlug: "page-type/page",
  partSlugs: [
    "boolean-property/locked-page-type",
    "boolean-property/sort-descending",
    "number-property/group-page-size",
    "number-property/item-page-size",
    "number-property/live-refresh-ms",
    "number-property/page-size",
    "number-property/view-place",
    "record-property/group-sorts",
    "record-property/view-sorts",
    "relation-property/nav-slug",
    "select-property/gallery-card-size",
    "select-property/group-granularity",
    "select-property/layout",
    "text-property/always-show-properties",
    "text-property/gallery-cover-source",
    "text-property/group-by",
    "text-property/hidden-properties-order",
    "text-property/reorder-command",
    "text-property/sort-key",
    "text-property/view-predicate",
    "text-property/visible-properties",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "nav-slug", required: true, many: false },
    { pagePropertySlug: "draws-slug", required: false, many: false },
    { pagePropertySlug: "view-predicate", required: false, many: false },
    { pagePropertySlug: "view-place", required: false, many: false },
    { pagePropertySlug: "layout", required: false, many: false },
    { pagePropertySlug: "narrows", required: false, many: true, max: 10 },
    { pagePropertySlug: "view-sorts", required: false, many: true, max: 5 },
    { pagePropertySlug: "group-by", required: false, many: false },
    { pagePropertySlug: "group-sorts", required: false, many: true, max: 5 },
    { pagePropertySlug: "group-granularity", required: false, many: false },
    { pagePropertySlug: "visible-properties", required: false, many: true, max: null },
    { pagePropertySlug: "always-show-properties", required: false, many: true, max: null },
    { pagePropertySlug: "hidden-properties-order", required: false, many: true, max: null },
    { pagePropertySlug: "page-size", required: false, many: false },
    { pagePropertySlug: "item-page-size", required: false, many: false },
    { pagePropertySlug: "group-page-size", required: false, many: false },
    { pagePropertySlug: "gallery-cover-source", required: false, many: false },
    { pagePropertySlug: "gallery-card-size", required: false, many: false },
    { pagePropertySlug: "reorder-command", required: false, many: false },
    { pagePropertySlug: "live-refresh-ms", required: false, many: false },
    { pagePropertySlug: "locked-page-type", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A view belongs to the nav item that owns it and is drawn nowhere else.",
    },
    {
      invariantKind: "departure",
      statement:
        "A view names the page type it draws by slug, and its properties by the key each declaration states.",
    },
    {
      invariantKind: "departure",
      statement:
        "A view carries the order its properties are shown in, the hidden ones among them.",
    },
    {
      invariantKind: "departure",
      statement:
        "A person edits a view from the interface that draws it, so its values are written by the browser rather than authored.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cross-type view names a predicate instead of a page type and draws pages of whatever types the predicate matches.",
    },
    {
      invariantKind: "departure",
      statement: "A view narrows by the same record a page query narrows by.",
    },
    {
      invariantKind: "gap",
      statement: "A view states its own question rather than naming a page query that holds it.",
    },
  ],
} as const satisfies PageType
