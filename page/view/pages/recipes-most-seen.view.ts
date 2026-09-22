import type { View } from "akasha/page/view/view.page-type.types.ts"

export const recipesMostSeen = {
  id: "01a0c954-11ab-784e-bec5-fdaff838a02f",
  type: "page-type/view",
  slug: "recipes-most-seen",
  title: "Most Seen",
  pageType: "page-type/world-recipe",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
} as const satisfies View
