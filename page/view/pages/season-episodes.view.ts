import type { View } from "akasha/page/view/view.page-type.types.ts"

export const seasonEpisodes = {
  id: "01a18803-cea6-7697-9fe6-4d2570c13d70",
  type: "page-type/view",
  slug: "season-episodes",
  title: "Episodes",
  pageType: "page-type/episode",
  embeddedBy: "page-type/season",
  layout: "table",
  narrows: [],
  viewSorts: [{ key: "position", descending: false }],
  visibleProperties: ["completion-percent", "total-length", "total-progress"],
  createdAt: "2026-10-29T14:15:13.316Z",
  updatedAt: "2026-10-29T14:15:13.316Z",
} as const satisfies View
