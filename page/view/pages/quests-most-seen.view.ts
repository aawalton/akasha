import type { View } from "akasha/page/view/view.page-type.types.ts"

export const questsMostSeen = {
  id: "01a0c954-1167-777c-9e08-69b49c007788",
  type: "page-type/view",
  slug: "quests-most-seen",
  title: "Most Seen",
  pageType: "page-type/world-quest",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
} as const satisfies View
