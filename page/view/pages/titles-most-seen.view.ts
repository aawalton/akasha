import type { View } from "akasha/page/view/view.page-type.types.ts"

export const titlesMostSeen = {
  id: "01a0c954-1389-7acb-b36f-170e3bab9d90",
  type: "page-type/view",
  slug: "titles-most-seen",
  title: "Most Seen",
  pageType: "page-type/world-title",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
} as const satisfies View
