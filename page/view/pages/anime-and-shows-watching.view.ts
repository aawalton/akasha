import type { View } from "akasha/page/view/view.page-type.types.ts"

export const animeAndShowsWatching = {
  id: "01a06577-2614-7007-9afe-cb2897967dd0",
  type: "page-type/view",
  slug: "anime-and-shows-watching",
  title: "Watching",
  nav: "nav/anime-and-shows",
  pageType: "page-type/ki-show",
  viewPlace: 0,
  layout: "cards",
  narrows: [{ key: "status", comparison: "in", values: ["In Progress", "Following"] }],
  viewSorts: [
    { key: "own-progress", descending: true },
    { key: "title", descending: false },
  ],
  visibleProperties: ["status", "own-progress", "own-length"],
  createdAt: "2026-09-03T04:11:42.484Z",
  updatedAt: "2026-09-21T19:33:21.000Z",
} as const satisfies View
