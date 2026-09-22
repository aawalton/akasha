import type { View } from "akasha/page/view/view.page-type.types.ts"

export const charactersAlphabetical = {
  id: "01a0c940-f015-75f6-8db4-7ac9450de7f7",
  type: "page-type/view",
  slug: "characters-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-character",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
