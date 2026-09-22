import type { View } from "akasha/page/view/view.page-type.types.ts"

export const songsAlphabetical = {
  id: "01a0c954-12ce-767c-aab2-f43ef2d41563",
  type: "page-type/view",
  slug: "songs-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/world-song",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
