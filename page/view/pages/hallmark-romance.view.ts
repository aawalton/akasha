import type { View } from "akasha/page/view/view.page-type.types.ts"

export const hallmarkRomance = {
  id: "01a174aa-1e78-7826-b71d-0632a2837c4e",
  type: "page-type/view",
  slug: "hallmark-romance",
  title: "Romance",
  nav: "nav/hallmark",
  pageType: "page-type/movie",
  viewPlace: 0,
  layout: "cards",
  narrows: [
    {
      key: "within-collections.collection",
      comparison: "is",
      values: ["show-collection/hallmark-romance"],
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
