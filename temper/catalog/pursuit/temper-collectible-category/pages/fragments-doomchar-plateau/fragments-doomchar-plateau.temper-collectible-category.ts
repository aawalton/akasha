import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const fragmentsDoomcharPlateau = {
  id: "01a06165-9167-7012-a0e0-498f3b061ac0",
  type: "page-type/temper-collectible-category",
  slug: "fragments-doomchar-plateau",
  title: "Doomchar Plateau",
  parent: "temper-collectible-category/fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
