import type { View } from "akasha/page/view/view.page-type.types.ts"

export const songsMostSeen = {
  id: "01a0c954-12b5-7a72-87c3-999f408e2e32",
  type: "page-type/view",
  slug: "songs-most-seen",
  title: "Most Seen",
  pageType: "page-type/world-song",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
} as const satisfies View
