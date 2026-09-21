import type { View } from "akasha/page/view/view.page-type.types.ts"

export const requestsDenied = {
  id: "01a0c4ba-04f2-7b1b-a566-9c6981156c7b",
  type: "page-type/view",
  slug: "requests-denied",
  title: "Denied",
  nav: "nav/requests",
  pageType: "page-type/feature-request",
  viewPlace: 3,
  layout: "list",
  narrows: [{ key: "standing", comparison: "is", values: ["denied"] }],
  viewSorts: [{ key: "title", descending: false }],
  visibleProperties: ["product", "ask"],
} as const satisfies View
