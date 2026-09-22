import type { View } from "akasha/page/view/view.page-type.types.ts"

export const religionsAlphabetical = {
  id: "01a0c954-1208-75dc-a2c9-2f8ed9090e12",
  type: "page-type/view",
  slug: "religions-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-religion",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
