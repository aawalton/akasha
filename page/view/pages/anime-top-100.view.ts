import type { View } from "akasha/page/view/view.page-type.types.ts"

export const animeTop100 = {
  id: "01a183d3-50d7-7f0e-b7aa-e48d50566d1e",
  type: "page-type/view",
  slug: "anime-top-100",
  title: "Top 100",
  nav: "nav/anime",
  pageType: "page-type/fandom",
  viewPlace: 0,
  layout: "table",
  narrows: [
    {
      key: "within-collections.collection",
      comparison: "is",
      values: ["fandom-collection/anime-top-100"],
    },
  ],
  viewSorts: [{ key: "position", descending: false }],
  visibleProperties: ["position", "status", "completion-percent", "total-length", "total-progress"],
  createdAt: "2026-10-28T18:43:46.517Z",
  updatedAt: "2026-10-28T18:43:46.517Z",
} as const satisfies View
