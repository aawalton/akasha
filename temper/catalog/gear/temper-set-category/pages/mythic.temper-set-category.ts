import type { TemperSetCategory } from "akasha/temper/catalog/gear/temper-set-category/temper-set-category.page-type.types.ts"

export const mythic = {
  id: "019e46b5-0dc4-78c4-a7c2-92ad1154f3e7",
  type: "page-type/temper-set-category",
  slug: "mythic",
  title: "Mythic",
  key: "mythic",
  displayOrder: 7,
  activity: "temper-activity-category/exploration",
} as const satisfies TemperSetCategory
