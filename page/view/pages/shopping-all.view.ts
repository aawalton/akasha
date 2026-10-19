import type { View } from "akasha/page/view/view.page-type.types.ts"

export const shoppingAll = {
  id: "01a15447-78a6-7d1a-874b-e7c84765138e",
  type: "page-type/view",
  slug: "shopping-all",
  title: "All",
  nav: "nav/shopping",
  pageType: "page-type/shopping-item",
  viewPlace: 1,
  layout: "table",
  narrows: [],
  viewSorts: [{ key: "bought-at", descending: false }],
  groupBy: "store",
  groupSorts: [{ key: "store", descending: false }],
  visibleProperties: ["title"],
  createdAt: "2026-10-19T13:08:52.517Z",
  updatedAt: "2026-10-19T13:08:52.517Z",
} as const satisfies View
