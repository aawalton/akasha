import type { View } from "../view.page-type.ts"

export const seriesAll = {
  id: "01a06577-2615-7006-b819-51729fedaf90",
  pageTypeSlug: "view",
  type: "view",
  slug: "series-all",
  title: "All",
  nav: "series",
  pageType: "ki-book-series",
  viewPlace: 0,
  layout: "cards",
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
