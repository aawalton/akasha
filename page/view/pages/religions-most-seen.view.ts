import type { View } from "akasha/page/view/view.page-type.types.ts"

export const religionsMostSeen = {
  id: "01a0c954-11e9-7587-964e-efae44aa745e",
  type: "page-type/view",
  slug: "religions-most-seen",
  title: "Most Seen",
  nav: "nav/innworld-religions",
  pageType: "page-type/world-religion",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
  createdAt: "2026-09-22T13:35:25.161Z",
  updatedAt: "2026-09-28T22:16:42.000Z",
} as const satisfies View
