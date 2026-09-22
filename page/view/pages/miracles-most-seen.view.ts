import type { View } from "akasha/page/view/view.page-type.types.ts"

export const miraclesMostSeen = {
  id: "01a0c954-1120-73b6-b926-ccb90e404419",
  type: "page-type/view",
  slug: "miracles-most-seen",
  title: "Most Seen",
  pageType: "page-type/world-miracle",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
} as const satisfies View
