import type { View } from "../view.page-type.ts"

export const homeRecentlyViewed = {
  id: "01a06577-2614-7016-b2b1-18432b950d21",
  pageTypeSlug: "view",
  slug: "home-recently-viewed",
  title: "Recently Viewed",
  navSlug: "home",
  viewPredicate: "recently-viewed",
  viewPlace: 1,
  layout: "table",
  viewSorts: [{ key: "updated-at", descending: true }],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
