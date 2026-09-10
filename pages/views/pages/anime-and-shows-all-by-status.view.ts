import type { View } from "../view.page-type.types.ts"

export const animeAndShowsAllByStatus = {
  id: "01a06577-2614-7004-a141-2dc21b740922",
  pageTypeSlug: "view",
  type: "view",
  slug: "anime-and-shows-all-by-status",
  title: "All by Status",
  nav: "anime-and-shows",
  pageType: "ki-show",
  viewPlace: 3,
  layout: "cards",
  viewSorts: [{ key: "title", descending: false }],
  groupSorts: [{ key: "status", descending: true }],
  groupBy: "status",
  visibleProperties: ["status", "progress"],
} as const satisfies View
