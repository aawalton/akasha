import type { View } from "akasha/page/view/view.page-type.types.ts"

export const jennyHallmarkChristmas = {
  id: "01a174af-7c39-7008-81f7-eb02ee8242df",
  type: "page-type/view",
  slug: "jenny-hallmark-christmas",
  title: "Christmas",
  nav: "nav/jenny-hallmark",
  pageType: "page-type/movie",
  viewPlace: 2,
  layout: "cards",
  narrows: [
    {
      key: "within-collections.collection",
      comparison: "is",
      values: ["show-collection/hallmark-christmas"],
    },
    { key: "status", comparison: "not-in", values: ["completed", "archived", "not-applicable"] },
  ],
  groupBy: "part-of-collections",
  viewSorts: [
    { key: "position", descending: false },
    { key: "published-at", descending: false },
  ],
  visibleProperties: ["own-length", "position"],
  createdAt: "2026-10-25T20:10:20.088Z",
  updatedAt: "2026-10-25T20:10:20.088Z",
} as const satisfies View
