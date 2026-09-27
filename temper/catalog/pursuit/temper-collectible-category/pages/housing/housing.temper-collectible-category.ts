import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const housing = {
  id: "01a06165-9169-7001-9aa6-9cd7669514f7",
  type: "page-type/temper-collectible-category",
  slug: "housing",
  title: "Housing",
  esoCategoryIndex: 5,
  activity: "temper-activity-category/housing",
} as const satisfies TemperCollectibleCategory
