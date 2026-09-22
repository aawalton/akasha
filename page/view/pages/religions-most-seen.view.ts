import type { View } from "akasha/page/view/view.page-type.types.ts"

export const religionsMostSeen = {
  id: "01a0c954-11e9-7587-964e-efae44aa745e",
  type: "page-type/view",
  slug: "religions-most-seen",
  title: "Most Seen",
  pageType: "page-type/world-religion",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
} as const satisfies View
