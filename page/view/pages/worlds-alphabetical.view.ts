import type { View } from "akasha/page/view/view.page-type.types.ts"

export const worldsAlphabetical = {
  id: "01a0ea18-2690-75ea-a4e6-3f386706c04a",
  type: "page-type/view",
  slug: "worlds-alphabetical",
  title: "Alphabetical",
  nav: "nav/innworld-the-wandering-inn",
  pageType: "page-type/world",
  viewPlace: 0,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
