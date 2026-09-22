import type { View } from "akasha/page/view/view.page-type.types.ts"

export const itemsMostSeen = {
  id: "01a0c954-108e-7555-a425-1dbcb75ecfa3",
  type: "page-type/view",
  slug: "items-most-seen",
  title: "Most Seen",
  pageType: "page-type/world-item",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
} as const satisfies View
