import type { View } from "akasha/page/view/view.page-type.types.ts"

export const questsAlphabetical = {
  id: "01a0c954-117b-7a82-85b6-77f4b006be45",
  type: "page-type/view",
  slug: "quests-alphabetical",
  title: "Alphabetical",
  nav: "nav/innworld-quests",
  pageType: "page-type/world-quest",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
  createdAt: "2026-09-22T13:35:25.051Z",
  updatedAt: "2026-09-28T22:16:42.000Z",
} as const satisfies View
