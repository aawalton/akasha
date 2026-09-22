import type { View } from "akasha/page/view/view.page-type.types.ts"

export const speciesMostSeen = {
  id: "01a0c954-1300-7e2f-94d4-7f13f7f09cff",
  type: "page-type/view",
  slug: "species-most-seen",
  title: "Most Seen",
  pageType: "page-type/world-species",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
} as const satisfies View
