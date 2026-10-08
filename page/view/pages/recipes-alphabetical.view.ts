import type { View } from "akasha/page/view/view.page-type.types.ts"

export const recipesAlphabetical = {
  id: "01a0c954-11bf-7f11-a4b5-a3f854cb3f19",
  type: "page-type/view",
  slug: "recipes-alphabetical",
  title: "Alphabetical",
  nav: "nav/innworld-recipes",
  pageType: "page-type/world-recipe",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
  createdAt: "2026-09-22T13:35:25.119Z",
  updatedAt: "2026-09-28T22:16:42.000Z",
} as const satisfies View
