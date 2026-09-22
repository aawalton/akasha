import type { View } from "akasha/page/view/view.page-type.types.ts"

export const boonsAlphabetical = {
  id: "01a0c954-0ef8-71ab-9b87-11d3d348786b",
  type: "page-type/view",
  slug: "boons-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-boon",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
