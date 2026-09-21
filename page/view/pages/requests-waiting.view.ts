import type { View } from "akasha/page/view/view.page-type.types.ts"

export const requestsWaiting = {
  id: "01a0c4b3-a499-7229-bed2-198981b838ae",
  type: "page-type/view",
  slug: "requests-waiting",
  title: "Waiting",
  nav: "nav/requests",
  pageType: "page-type/feature-request",
  viewPlace: 1,
  layout: "list",
  narrows: [{ key: "feature-request-standing", comparison: "is", values: ["proposed"] }],
  viewSorts: [{ key: "title", descending: false }],
  visibleProperties: ["feature-request-product", "feature-request-ask"],
} as const satisfies View
