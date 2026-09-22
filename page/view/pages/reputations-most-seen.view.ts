import type { View } from "akasha/page/view/view.page-type.types.ts"

export const reputationsMostSeen = {
  id: "01a0c954-1230-7a80-a83f-24928306a442",
  type: "page-type/view",
  slug: "reputations-most-seen",
  title: "Most Seen",
  pageType: "page-type/world-reputation",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
} as const satisfies View
