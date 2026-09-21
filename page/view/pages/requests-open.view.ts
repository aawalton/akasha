import type { View } from "akasha/page/view/view.page-type.types.ts"

export const requestsOpen = {
  id: "01a0c4b3-a499-7a82-b1b0-02a39d4f0130",
  type: "page-type/view",
  slug: "requests-open",
  title: "Open",
  nav: "nav/requests",
  pageType: "page-type/feature-request",
  viewPlace: 0,
  layout: "cards",
  narrows: [{ key: "feature-request-standing", comparison: "is", values: ["published"] }],
  viewSorts: [{ key: "title", descending: false }],
  visibleProperties: ["feature-request-product", "feature-request-ask"],
} as const satisfies View
