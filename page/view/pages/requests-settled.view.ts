import type { View } from "akasha/page/view/view.page-type.types.ts"

export const requestsSettled = {
  id: "01a0c4b3-a499-7b8c-a333-9434b44deee2",
  type: "page-type/view",
  slug: "requests-settled",
  title: "Settled",
  nav: "nav/requests",
  pageType: "page-type/feature-request",
  viewPlace: 2,
  layout: "list",
  narrows: [{ key: "standing", comparison: "in", values: ["completed", "denied"] }],
  viewSorts: [{ key: "title", descending: false }],
  visibleProperties: ["product", "standing"],
} as const satisfies View
