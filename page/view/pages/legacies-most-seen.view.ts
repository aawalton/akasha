import type { View } from "akasha/page/view/view.page-type.types.ts"

export const legaciesMostSeen = {
  id: "01a0c954-10d7-793a-844d-bcd1fe369892",
  type: "page-type/view",
  slug: "legacies-most-seen",
  title: "Most Seen",
  nav: "nav/innworld-legacies",
  pageType: "page-type/world-legacy",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
  createdAt: "2026-09-22T13:35:24.887Z",
  updatedAt: "2026-09-28T22:16:42.000Z",
} as const satisfies View
