import type { View } from "akasha/page/view/view.page-type.types.ts"

export const jennyHallmarkShows = {
  id: "01a174af-7c3a-7ab6-9d5f-2d4dcd0f028c",
  type: "page-type/view",
  slug: "jenny-hallmark-shows",
  title: "Shows",
  nav: "nav/jenny-hallmark",
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
  createdAt: "2026-10-25T20:10:20.088Z",
  updatedAt: "2026-10-25T20:10:20.088Z",
} as const satisfies View
