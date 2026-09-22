import type { View } from "akasha/page/view/view.page-type.types.ts"

export const conditionsAlphabetical = {
  id: "01a0c954-0fcd-7bdb-83b0-1db34ef13b19",
  type: "page-type/view",
  slug: "conditions-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-condition",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
