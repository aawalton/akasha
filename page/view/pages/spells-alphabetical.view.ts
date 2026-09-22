import type { View } from "akasha/page/view/view.page-type.types.ts"

export const spellsAlphabetical = {
  id: "01a0c954-1359-7e80-82ea-0b7a22399472",
  type: "page-type/view",
  slug: "spells-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-spell",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
