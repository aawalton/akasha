import type { View } from "akasha/page/view/view.page-type.types.ts"

export const carriedMemoriesAlphabetical = {
  id: "01a0c954-0f42-7b72-b06e-551cebb16c28",
  type: "page-type/view",
  slug: "carried-memories-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-carried-memory",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
