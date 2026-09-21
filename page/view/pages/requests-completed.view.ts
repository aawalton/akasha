import type { View } from "akasha/page/view/view.page-type.types.ts"

export const requestsCompleted = {
  id: "01a0c4ba-04f2-7f02-a8db-9708e55cde58",
  type: "page-type/view",
  slug: "requests-completed",
  title: "Completed",
  nav: "nav/requests",
  pageType: "page-type/feature-request",
  viewPlace: 2,
  layout: "list",
  narrows: [{ key: "standing", comparison: "is", values: ["completed"] }],
  viewSorts: [{ key: "title", descending: false }],
  visibleProperties: ["product", "ask"],
} as const satisfies View
