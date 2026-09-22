import type { View } from "akasha/page/view/view.page-type.types.ts"

export const boonsMostSeen = {
  id: "01a0c954-0ee2-7a52-9e14-934634d4ac91",
  type: "page-type/view",
  slug: "boons-most-seen",
  title: "Most Seen",
  pageType: "page-type/world-boon",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
} as const satisfies View
