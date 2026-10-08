import type { View } from "akasha/page/view/view.page-type.types.ts"

export const requestsPublished = {
  id: "01a0c4ba-04f2-79bc-af66-e6ecbc4faf9c",
  type: "page-type/view",
  slug: "requests-published",
  title: "Published",
  nav: "nav/requests",
  pageType: "page-type/feature-request",
  viewPlace: 1,
  layout: "cards",
  narrows: [{ key: "standing", comparison: "is", values: ["published"] }],
  viewSorts: [{ key: "title", descending: false }],
  visibleProperties: ["product", "boost"],
  createdAt: "2026-09-21T16:08:40.434Z",
  updatedAt: "2026-09-21T23:18:09.000Z",
} as const satisfies View
