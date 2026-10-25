import type { View } from "akasha/page/view/view.page-type.types.ts"

export const hallmarkShows = {
  id: "01a174aa-1e78-7aca-92e1-c35355cd5d8a",
  type: "page-type/view",
  slug: "hallmark-shows",
  title: "Shows",
  nav: "nav/hallmark",
  pageType: "page-type/show",
  viewPlace: 3,
  layout: "cards",
  narrows: [
    {
      key: "within-collections.collection",
      comparison: "is",
      values: ["show-collection/hallmark"],
    },
    { key: "status", comparison: "not-in", values: ["completed", "archived", "not-applicable"] },
  ],
  viewSorts: [{ key: "published-at", descending: false }],
  visibleProperties: ["position"],
  createdAt: "2026-10-25T20:04:28.406Z",
  updatedAt: "2026-10-25T20:09:36.037Z",
} as const satisfies View
