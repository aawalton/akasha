import type { View } from "../view.page-type.ts"

export const gamesList = {
  id: "01a06577-2614-7014-8019-7b07c900e405",
  pageTypeSlug: "view",
  slug: "games-list",
  title: "List",
  navSlug: "games",
  viewPlace: 0,
  layout: "cards",
  viewSorts: [{ key: "created-at", descending: true }],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
