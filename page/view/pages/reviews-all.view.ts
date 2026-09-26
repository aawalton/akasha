import type { View } from "akasha/page/view/view.page-type.types.ts"

export const reviewsAll = {
  id: "01a0ded0-0e7f-711c-a1c2-ef0004fb49e3",
  type: "page-type/view",
  slug: "reviews-all",
  title: "All",
  nav: "nav/reviews",
  pageType: "page-type/review",
  viewPlace: 0,
  layout: "list",
  viewSorts: [{ key: "title", descending: false }],
  visibleProperties: [],
} as const satisfies View
