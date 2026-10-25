import type { View } from "akasha/page/view/view.page-type.types.ts"

export const hallmarkChristmas = {
  id: "01a174aa-1e77-7ebf-a7e7-bf500cf377be",
  type: "page-type/view",
  slug: "hallmark-christmas",
  title: "Christmas",
  nav: "nav/hallmark",
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
