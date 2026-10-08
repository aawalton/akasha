import type { View } from "akasha/page/view/view.page-type.types.ts"

export const songsMostSeen = {
  id: "01a0c954-12b5-7a72-87c3-999f408e2e32",
  type: "page-type/view",
  slug: "songs-most-seen",
  title: "Most Seen",
  nav: "nav/innworld-songs",
  pageType: "page-type/world-song",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
  createdAt: "2026-09-22T13:35:25.365Z",
  updatedAt: "2026-09-28T22:16:42.000Z",
} as const satisfies View
