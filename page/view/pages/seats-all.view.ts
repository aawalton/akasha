import type { View } from "akasha/page/view/view.page-type.types.ts"

export const seatsAll = {
  id: "01a0d41a-7b48-7ac6-bd1d-fcecc891de0d",
  type: "page-type/view",
  slug: "seats-all",
  title: "All",
  nav: "nav/seats",
  pageType: "page-type/seat",
  viewPlace: 1,
  layout: "list",
  viewSorts: [{ key: "slug", descending: false }],
  visibleProperties: [],
  createdAt: "2026-09-24T15:48:20.424Z",
  updatedAt: "2026-09-27T17:29:48.000Z",
} as const satisfies View
