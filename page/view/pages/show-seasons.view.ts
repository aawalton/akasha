import type { View } from "akasha/page/view/view.page-type.types.ts"

export const showSeasons = {
  id: "01a18803-cea6-7903-99a9-612662824ee8",
  type: "page-type/view",
  slug: "show-seasons",
  title: "Seasons",
  pageType: "page-type/season",
  embeddedBy: "page-type/show",
  layout: "table",
  narrows: [],
  viewSorts: [{ key: "position", descending: false }],
  visibleProperties: ["completion-percent", "total-length", "total-progress"],
  createdAt: "2026-10-29T14:15:13.316Z",
  updatedAt: "2026-10-29T14:15:13.316Z",
} as const satisfies View
