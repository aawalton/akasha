import type { View } from "akasha/page/view/view.page-type.types.ts"

export const personasAll = {
  id: "01a0de75-35c8-733a-b988-e8aac10da25c",
  type: "page-type/view",
  slug: "personas-all",
  title: "All",
  nav: "nav/personas",
  pageType: "page-type/persona",
  viewPlace: 0,
  layout: "gallery",
  galleryCoverSource: "cover",
  galleryCardSize: "medium",
  viewSorts: [{ key: "slug", descending: false }],
  visibleProperties: [],
  createdAt: "2026-09-26T16:03:38.568Z",
  updatedAt: "2026-09-26T16:03:46.000Z",
} as const satisfies View
