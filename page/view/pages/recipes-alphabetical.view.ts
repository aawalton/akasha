import type { View } from "akasha/page/view/view.page-type.types.ts"

export const recipesAlphabetical = {
  id: "01a0c954-11bf-7f11-a4b5-a3f854cb3f19",
  type: "page-type/view",
  slug: "recipes-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-recipe",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
