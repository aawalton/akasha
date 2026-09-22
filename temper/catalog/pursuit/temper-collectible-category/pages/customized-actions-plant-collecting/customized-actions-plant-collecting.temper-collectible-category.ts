import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const customizedActionsPlantCollecting = {
  id: "01a06165-9166-7007-a4bf-64b9ff5bf995",
  type: "page-type/temper-collectible-category",
  slug: "customized-actions-plant-collecting",
  title: "Plant Collecting",
  parent: "temper-collectible-category/customized-actions",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
