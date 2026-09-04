import type { View } from "../view.page-type.ts"

export const animeAndShowsToWatch = {
  id: "01a06577-2614-7006-b684-9cc2c30d6478",
  pageTypeSlug: "view",
  slug: "anime-and-shows-to-watch",
  title: "To Watch",
  navSlug: "anime-and-shows",
  viewPlace: 1,
  layout: "cards",
  narrows: [{ key: "status", comparison: "is", values: ["Not Started"] }],
  viewSorts: [{ key: "title", descending: false }],
  visibleProperties: ["status"],
} as const satisfies View
