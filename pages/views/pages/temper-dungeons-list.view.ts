import type { View } from "../view.page-type.ts"

export const temperDungeonsList = {
  id: "01a06577-2615-700f-b336-b7f631a6ac1f",
  pageTypeSlug: "view",
  slug: "temper-dungeons-list",
  title: "List",
  navSlug: "temper-dungeons",
  viewPlace: 0,
  viewSorts: [{ key: "title", descending: false }],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
