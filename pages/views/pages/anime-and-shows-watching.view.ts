import type { View } from "../view.page-type.ts"

export const animeAndShowsWatching = {
  id: "01a06577-2614-7007-9afe-cb2897967dd0",
  pageTypeSlug: "view",
  slug: "anime-and-shows-watching",
  title: "Watching",
  navSlug: "anime-and-shows",
  viewPlace: 0,
  layout: "cards",
  narrows: [{ key: "status", comparison: "in", values: ["In Progress", "Following"] }],
  viewSorts: [
    { key: "progress", descending: true },
    { key: "title", descending: false },
  ],
  visibleProperties: ["status", "progress", "length"],
} as const satisfies View
