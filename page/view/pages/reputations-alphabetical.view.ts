import type { View } from "akasha/page/view/view.page-type.types.ts"

export const reputationsAlphabetical = {
  id: "01a0c954-1243-71bc-ac42-229b82e7d124",
  type: "page-type/view",
  slug: "reputations-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-reputation",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
