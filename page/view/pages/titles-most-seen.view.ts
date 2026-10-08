import type { View } from "akasha/page/view/view.page-type.types.ts"

export const titlesMostSeen = {
  id: "01a0c954-1389-7acb-b36f-170e3bab9d90",
  type: "page-type/view",
  slug: "titles-most-seen",
  title: "Most Seen",
  nav: "nav/innworld-titles",
  pageType: "page-type/world-title",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
  createdAt: "2026-09-22T13:35:25.577Z",
  updatedAt: "2026-09-28T22:16:42.000Z",
} as const satisfies View
