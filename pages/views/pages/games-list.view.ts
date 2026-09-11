import type { View } from "akasha/pages/views/view.page-type.types.ts"

export const gamesList = {
  id: "01a06577-2614-7014-8019-7b07c900e405",
  type: "view",
  slug: "games-list",
  title: "List",
  nav: "games",
  pageType: "game",
  viewPlace: 0,
  layout: "cards",
  viewSorts: [{ key: "created-at", descending: true }],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
