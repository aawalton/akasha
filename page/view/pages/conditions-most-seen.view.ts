import type { View } from "akasha/page/view/view.page-type.types.ts"

export const conditionsMostSeen = {
  id: "01a0c954-0fbb-796a-a019-a744b56b9b7b",
  type: "page-type/view",
  slug: "conditions-most-seen",
  title: "Most Seen",
  pageType: "page-type/world-condition",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
} as const satisfies View
