import type { View } from "akasha/page/view/view.page-type.types.ts"

export const requestsProposed = {
  id: "01a0c4ba-04f2-7301-ac55-8df02a4864bf",
  type: "page-type/view",
  slug: "requests-proposed",
  title: "Proposed",
  nav: "nav/requests",
  pageType: "page-type/feature-request",
  viewPlace: 0,
  layout: "list",
  narrows: [{ key: "standing", comparison: "is", values: ["proposed"] }],
  viewSorts: [{ key: "title", descending: false }],
  visibleProperties: ["product", "ask"],
} as const satisfies View
