import type { View } from "akasha/page/view/view.page-type.types.ts"

export const speciesAlphabetical = {
  id: "01a0c954-1313-78b5-98f8-b111468224d6",
  type: "page-type/view",
  slug: "species-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-species",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
