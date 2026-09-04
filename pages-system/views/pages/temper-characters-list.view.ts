import type { View } from "../view.page-type.ts"

export const temperCharactersList = {
  id: "01a06577-2615-700e-880d-7fc36e8b213b",
  pageTypeSlug: "view",
  slug: "temper-characters-list",
  title: "List",
  navSlug: "temper-characters",
  drawsSlug: "temper-account-character",
  viewPlace: 0,
  viewSorts: [{ key: "sort-order", descending: false }],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
