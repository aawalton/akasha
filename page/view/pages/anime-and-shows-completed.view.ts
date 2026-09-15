import type { View } from "akasha/page/view/view.page-type.types.ts"

export const animeAndShowsCompleted = {
  id: "01a06577-2614-7005-b335-134f3e00e1b6",
  type: "page-type/view",
  slug: "anime-and-shows-completed",
  title: "Completed",
  nav: "nav/anime-and-shows",
  pageType: "page-type/ki-show",
  viewPlace: 2,
  layout: "cards",
  narrows: [{ key: "status", comparison: "is", values: ["Completed"] }],
  viewSorts: [{ key: "completed-at", descending: true }],
  visibleProperties: ["status", "completed-at"],
} as const satisfies View
