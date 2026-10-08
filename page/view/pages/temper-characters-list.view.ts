import type { View } from "akasha/page/view/view.page-type.types.ts"

export const temperCharactersList = {
  id: "01a06577-2615-700e-880d-7fc36e8b213b",
  type: "page-type/view",
  slug: "temper-characters-list",
  title: "List",
  nav: "nav/temper-characters",
  pageType: "page-type/temper-account-character",
  viewPlace: 0,
  viewSorts: [{ key: "display-order", descending: false }],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
  createdAt: "2026-09-03T04:11:42.485Z",
  updatedAt: "2026-09-21T19:33:21.000Z",
} as const satisfies View
