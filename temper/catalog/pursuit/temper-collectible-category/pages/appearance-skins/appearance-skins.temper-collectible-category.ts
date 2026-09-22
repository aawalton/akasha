import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const appearanceSkins = {
  id: "01a06165-9165-7006-b290-9d967e84415c",
  type: "page-type/temper-collectible-category",
  slug: "appearance-skins",
  title: "Skins",
  parent: "temper-collectible-category/appearance",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
