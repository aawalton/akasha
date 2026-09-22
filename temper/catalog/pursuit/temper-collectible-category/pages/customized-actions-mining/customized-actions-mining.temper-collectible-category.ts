import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const customizedActionsMining = {
  id: "01a06165-9166-7006-94ac-b5a271d16ad3",
  type: "page-type/temper-collectible-category",
  slug: "customized-actions-mining",
  title: "Mining",
  parent: "temper-collectible-category/customized-actions",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
