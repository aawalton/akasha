import type { View } from "akasha/page/view/view.page-type.types.ts"

export const albumsAll = {
  id: "01a0e95e-5b53-7050-a10a-c8d61e4a294e",
  type: "page-type/view",
  slug: "albums-all",
  title: "All",
  nav: "nav/albums",
  pageType: "page-type/image-album",
  viewPlace: 0,
  layout: "cards",
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View
