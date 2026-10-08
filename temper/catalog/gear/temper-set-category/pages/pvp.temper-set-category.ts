import type { TemperSetCategory } from "akasha/temper/catalog/gear/temper-set-category/temper-set-category.page-type.types.ts"

export const pvp = {
  id: "019e46b5-0dc5-7f5d-b765-26c8eb18208b",
  type: "page-type/temper-set-category",
  slug: "pvp",
  title: "PVP",
  key: "pvp",
  displayOrder: 8,
  activity: "temper-activity-category/pvp",
  esoCategoryNames: ["PvP"],
  createdAt: "2026-05-20T18:45:31.205Z",
  updatedAt: "2026-09-27T04:12:39.000Z",
} as const satisfies TemperSetCategory
