import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const customizedActionsRuneCollecting = {
  id: "01a06165-9167-7001-9dbe-585e7614fd4f",
  type: "page-type/temper-collectible-category",
  slug: "customized-actions-rune-collecting",
  title: "Rune Collecting",
  parent: "temper-collectible-category/customized-actions",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
