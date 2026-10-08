import type { View } from "akasha/page/view/view.page-type.types.ts"

export const recipesMostSeen = {
  id: "01a0c954-11ab-784e-bec5-fdaff838a02f",
  type: "page-type/view",
  slug: "recipes-most-seen",
  title: "Most Seen",
  nav: "nav/innworld-recipes",
  pageType: "page-type/world-recipe",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
  createdAt: "2026-09-22T13:35:25.099Z",
  updatedAt: "2026-09-28T22:16:42.000Z",
} as const satisfies View
