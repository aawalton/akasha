import type { View } from "akasha/page/view/view.page-type.types.ts"

export const miraclesMostSeen = {
  id: "01a0c954-1120-73b6-b926-ccb90e404419",
  type: "page-type/view",
  slug: "miracles-most-seen",
  title: "Most Seen",
  nav: "nav/innworld-miracles",
  pageType: "page-type/world-miracle",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
  createdAt: "2026-09-22T13:35:24.960Z",
  updatedAt: "2026-09-28T22:16:42.000Z",
} as const satisfies View
