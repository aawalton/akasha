import type { View } from "akasha/page/view/view.page-type.types.ts"

export const animeWatchNow = {
  id: "01a18443-7c24-7399-bf98-de97d07a1dc6",
  type: "page-type/view",
  slug: "anime-watch-now",
  title: "Watch Now",
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
    { key: "watchable", comparison: "is", values: ["true"] },
  ],
  groupBy: "held-streaming-on",
  viewSorts: [
    { key: "completion-percent", descending: true },
    { key: "total-length", descending: false },
    { key: "title", descending: false },
  ],
  visibleProperties: [
    "completion-percent",
    "position",
    "total-length",
    "total-progress",
    "held-streaming-on",
  ],
  createdAt: "2026-10-28T22:00:00.000Z",
  updatedAt: "2026-10-28T22:05:43.924Z",
} as const satisfies View
