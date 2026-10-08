import type { View } from "akasha/page/view/view.page-type.types.ts"

export const questsMostSeen = {
  id: "01a0c954-1167-777c-9e08-69b49c007788",
  type: "page-type/view",
  slug: "quests-most-seen",
  title: "Most Seen",
  nav: "nav/innworld-quests",
  pageType: "page-type/world-quest",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
  createdAt: "2026-09-22T13:35:25.031Z",
  updatedAt: "2026-09-28T22:16:42.000Z",
} as const satisfies View
