import type { View } from "akasha/page/view/view.page-type.types.ts"

export const religionsAlphabetical = {
  id: "01a0c954-1208-75dc-a2c9-2f8ed9090e12",
  type: "page-type/view",
  slug: "religions-alphabetical",
  title: "Alphabetical",
  nav: "nav/innworld-religions",
  pageType: "page-type/world-religion",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
  createdAt: "2026-09-22T13:35:25.192Z",
  updatedAt: "2026-09-28T22:16:42.000Z",
} as const satisfies View
