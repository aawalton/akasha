import type { View } from "akasha/page/view/view.page-type.types.ts"

export const spellsMostSeen = {
  id: "01a0c954-133f-78ba-864f-d98662b380bb",
  type: "page-type/view",
  slug: "spells-most-seen",
  title: "Most Seen",
  pageType: "page-type/world-spell",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
} as const satisfies View
