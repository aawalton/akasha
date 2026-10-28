import type { View } from "akasha/page/view/view.page-type.types.ts"

export const animeUnfinished = {
  id: "01a183d3-50d7-7f0e-b7aa-e48d50566d1e",
  type: "page-type/view",
  slug: "anime-unfinished",
  title: "Unfinished",
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
    { key: "completion", comparison: "not-in", values: ["completed"] },
    { key: "progressed-at", comparison: "before-or-empty", values: ["eso-day"] },
  ],
  viewSorts: [
    { key: "completion-percent", descending: true },
    { key: "total-length", descending: false },
    { key: "title", descending: false },
  ],
  visibleProperties: ["completion-percent", "position", "total-length", "total-progress"],
  createdAt: "2026-10-28T18:43:46.517Z",
  updatedAt: "2026-10-28T18:47:10.897Z",
} as const satisfies View
