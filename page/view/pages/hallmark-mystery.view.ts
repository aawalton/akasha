import type { View } from "akasha/page/view/view.page-type.types.ts"

export const hallmarkMystery = {
  id: "01a174aa-1e77-7118-af0b-c5ba890b2752",
  type: "page-type/view",
  slug: "hallmark-mystery",
  title: "Mystery",
  nav: "nav/hallmark",
  pageType: "page-type/movie",
  viewPlace: 1,
  layout: "cards",
  narrows: [
    {
      key: "within-collections.collection",
      comparison: "is",
      values: ["show-collection/hallmark-mystery"],
    },
    { key: "status", comparison: "not-in", values: ["completed", "archived", "not-applicable"] },
  ],
  groupBy: "part-of-collections",
  viewSorts: [
    { key: "position", descending: false },
    { key: "published-at", descending: false },
  ],
  visibleProperties: [
    "part-of-collections",
    "published-at",
    "own-length",
    "streaming-on",
    "status",
  ],
  createdAt: "2026-10-25T20:04:28.406Z",
  updatedAt: "2026-10-25T20:04:28.406Z",
} as const satisfies View
