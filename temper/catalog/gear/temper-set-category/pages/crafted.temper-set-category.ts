import type { TemperSetCategory } from "akasha/temper/catalog/gear/temper-set-category/temper-set-category.page-type.types.ts"

export const crafted = {
  id: "019e46b5-0dc1-7808-add2-981bffb9d91a",
  type: "page-type/temper-set-category",
  slug: "crafted",
  title: "Crafted",
  key: "crafted",
  displayOrder: 5,
  activity: "temper-activity-category/crafting",
} as const satisfies TemperSetCategory
