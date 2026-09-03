import type { View } from "../view.page-type.ts"

export const dungeonsList = {
  id: "01a06577-2614-7013-9d4f-d47bf22d04a3",
  pageTypeSlug: "view",
  slug: "dungeons-list",
  title: "List",
  navSlug: "dungeons",
  drawsSlug: "temper-dungeon",
  viewPlace: 0,
  viewSorts: [{ key: "rotation-position", descending: true }],
  groupBy: "solo-difficulty",
  visibleProperties: ["solo-difficulty"],
  hiddenPropertiesOrder: ["quest-giver"],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
