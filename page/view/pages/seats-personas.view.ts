import type { View } from "akasha/page/view/view.page-type.types.ts"

export const seatsPersonas = {
  id: "01a0e3ea-6b62-73e6-ba58-3bf057af1e25",
  type: "page-type/view",
  slug: "seats-personas",
  title: "Personas",
  nav: "nav/seats",
  pageType: "page-type/seat",
  viewPlace: 0,
  layout: "list",
  narrows: [{ key: "seat-section", comparison: "is", values: ["personas"] }],
  viewSorts: [{ key: "slug", descending: false }],
  visibleProperties: [],
} as const satisfies View
