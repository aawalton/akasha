import type { View } from "../view.page-type.ts"

export const animeAndShowsCompleted = {
  id: "01a06577-2614-7005-b335-134f3e00e1b6",
  pageTypeSlug: "view",
  slug: "anime-and-shows-completed",
  title: "Completed",
  navSlug: "anime-and-shows",
  drawsSlug: "ki-show",
  viewPlace: 2,
  layout: "cards",
  narrows: [{ key: "status", comparison: "is", values: ["Completed"] }],
  viewSorts: [{ key: "completed-at", descending: true }],
  visibleProperties: ["status", "completed-at"],
} as const satisfies View
