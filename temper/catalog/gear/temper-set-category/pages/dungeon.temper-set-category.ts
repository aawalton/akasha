import type { TemperSetCategory } from "akasha/temper/catalog/gear/temper-set-category/temper-set-category.page-type.types.ts"

export const dungeon = {
  id: "019e46b5-0db9-7e77-847f-cc0d0d257fee",
  type: "page-type/temper-set-category",
  slug: "dungeon",
  title: "Dungeon",
  key: "dungeon",
  displayOrder: 2,
  activity: "temper-activity-category/group-dungeons",
  esoCategoryNames: ["Dungeons", "DLC Dungeons"],
  createdAt: "2026-05-20T18:45:31.193Z",
  updatedAt: "2026-09-27T04:12:39.000Z",
} as const satisfies TemperSetCategory
