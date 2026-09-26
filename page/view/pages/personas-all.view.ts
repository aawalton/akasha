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
} as const satisfies View
