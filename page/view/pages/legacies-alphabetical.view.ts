import type { View } from "akasha/page/view/view.page-type.types.ts"

export const legaciesAlphabetical = {
  id: "01a0c954-10f5-71c6-ae6c-085c7b9fda3f",
  type: "page-type/view",
  slug: "legacies-alphabetical",
  title: "Alphabetical",
  nav: "nav/innworld-legacies",
  pageType: "page-type/world-legacy",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
  createdAt: "2026-09-22T13:35:24.917Z",
  updatedAt: "2026-09-28T22:16:42.000Z",
} as const satisfies View
