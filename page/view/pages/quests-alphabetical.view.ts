import type { View } from "akasha/page/view/view.page-type.types.ts"

export const questsAlphabetical = {
  id: "01a0c954-117b-7a82-85b6-77f4b006be45",
  type: "page-type/view",
  slug: "quests-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-quest",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
