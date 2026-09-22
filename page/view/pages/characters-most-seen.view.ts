import type { View } from "akasha/page/view/view.page-type.types.ts"

export const charactersMostSeen = {
  id: "01a0c940-deed-7a99-9b05-12fa214b9b30",
  type: "page-type/view",
  slug: "characters-most-seen",
  title: "Most Seen",
  pageType: "page-type/world-character",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
} as const satisfies View
