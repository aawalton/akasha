import type { View } from "akasha/page/view/view.page-type.types.ts"

export const legaciesMostSeen = {
  id: "01a0c954-10d7-793a-844d-bcd1fe369892",
  type: "page-type/view",
  slug: "legacies-most-seen",
  title: "Most Seen",
  pageType: "page-type/world-legacy",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
} as const satisfies View
