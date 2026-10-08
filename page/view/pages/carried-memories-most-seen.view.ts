import type { View } from "akasha/page/view/view.page-type.types.ts"

export const carriedMemoriesMostSeen = {
  id: "01a0c954-0f27-7430-956d-6934b1df15db",
  type: "page-type/view",
  slug: "carried-memories-most-seen",
  title: "Most Seen",
  nav: "nav/innworld-carried-memories",
  pageType: "page-type/world-carried-memory",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
  createdAt: "2026-09-22T13:35:24.455Z",
  updatedAt: "2026-09-28T22:16:42.000Z",
} as const satisfies View
