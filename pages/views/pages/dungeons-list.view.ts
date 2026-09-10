import type { View } from "../view.page-type.types.ts"

export const dungeonsList = {
  id: "01a06577-2614-7013-9d4f-d47bf22d04a3",
  pageTypeSlug: "view",
  type: "view",
  slug: "dungeons-list",
  title: "List",
  nav: "dungeons",
  pageType: "temper-dungeon",
  viewPlace: 0,
  viewSorts: [{ key: "rotation-position", descending: true }],
  groupBy: "solo-difficulty",
  visibleProperties: ["solo-difficulty"],
  hiddenPropertiesOrder: ["quest-giver"],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
