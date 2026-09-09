import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
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
  extends: ["page-type/page"],
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
    "relation-property/nav",
    "relation-property/view-page-type",
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
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "relation-property/nav", required: true, many: false },
    { pagePropertySlug: "relation-property/view-page-type", required: false, many: false },
    { pagePropertySlug: "text-property/view-predicate", required: false, many: false },
    { pagePropertySlug: "number-property/view-place", required: false, many: false },
    { pagePropertySlug: "select-property/layout", required: false, many: false },
    { pagePropertySlug: "record-property/narrows", required: false, many: true, maxCount: 10 },
    { pagePropertySlug: "record-property/view-sorts", required: false, many: true, maxCount: 5 },
    { pagePropertySlug: "text-property/group-by", required: false, many: false },
    { pagePropertySlug: "record-property/group-sorts", required: false, many: true, maxCount: 5 },
    { pagePropertySlug: "select-property/group-granularity", required: false, many: false },
    {
      pagePropertySlug: "text-property/visible-properties",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pagePropertySlug: "text-property/always-show-properties",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pagePropertySlug: "text-property/hidden-properties-order",
      required: false,
      many: true,
      maxCount: null,
    },
    { pagePropertySlug: "number-property/page-size", required: false, many: false },
    { pagePropertySlug: "number-property/item-page-size", required: false, many: false },
    { pagePropertySlug: "number-property/group-page-size", required: false, many: false },
    { pagePropertySlug: "text-property/gallery-cover-source", required: false, many: false },
    { pagePropertySlug: "select-property/gallery-card-size", required: false, many: false },
    { pagePropertySlug: "text-property/reorder-command", required: false, many: false },
    { pagePropertySlug: "number-property/live-refresh-ms", required: false, many: false },
    { pagePropertySlug: "boolean-property/locked-page-type", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A view naming no predicate names by slug the page type the view lists.",
    },
    {
      invariantKind: "departure",
      statement: "A view names a property by that property's declaration key.",
    },
    {
      invariantKind: "departure",
      statement: "A view has the order its properties are shown in.",
    },
    {
      invariantKind: "departure",
      statement: "A view has its hidden properties.",
    },
    {
      invariantKind: "departure",
      statement: "A person edits a view from the interface that draws that view.",
    },
    {
      invariantKind: "departure",
      statement: "A view's values are written by the browser rather than authored.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cross-type view names a predicate instead of a page type and draws pages of any matching type.",
    },
    {
      invariantKind: "departure",
      statement: "A view narrows by the same record a page query narrows by.",
    },
    {
      invariantKind: "gap",
      statement:
        "A view states its own question rather than naming a page query that has that question.",
    },
  ],
} as const satisfies PageType
