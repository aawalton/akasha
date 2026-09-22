import type { View } from "akasha/page/view/view.page-type.types.ts"

export const cursesAlphabetical = {
  id: "01a0c954-1016-7331-9efa-0f9b9589f280",
  type: "page-type/view",
  slug: "curses-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-curse",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
