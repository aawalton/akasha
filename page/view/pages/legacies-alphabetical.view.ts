import type { View } from "akasha/page/view/view.page-type.types.ts"

export const legaciesAlphabetical = {
  id: "01a0c954-10f5-71c6-ae6c-085c7b9fda3f",
  type: "page-type/view",
  slug: "legacies-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-legacy",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
