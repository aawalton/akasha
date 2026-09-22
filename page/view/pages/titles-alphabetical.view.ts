import type { View } from "akasha/page/view/view.page-type.types.ts"

export const titlesAlphabetical = {
  id: "01a0c954-13a0-70ba-aeee-aaaace2e5148",
  type: "page-type/view",
  slug: "titles-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-title",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
