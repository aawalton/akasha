import type { View } from "akasha/page/view/view.page-type.types.ts"

export const classesMostSeen = {
  id: "01a0c954-0f69-7b12-9202-8523d481e89f",
  type: "page-type/view",
  slug: "classes-most-seen",
  title: "Most Seen",
  nav: "nav/innworld-classes",
  pageType: "page-type/world-class",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
  createdAt: "2026-09-22T13:35:24.521Z",
  updatedAt: "2026-09-28T22:16:42.000Z",
} as const satisfies View
