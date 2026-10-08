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
  createdAt: "2026-09-28T18:54:30.227Z",
  updatedAt: "2026-09-28T18:54:33.000Z",
} as const satisfies View
