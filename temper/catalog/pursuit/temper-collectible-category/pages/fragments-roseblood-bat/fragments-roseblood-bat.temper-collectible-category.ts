import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const fragmentsRosebloodBat = {
  id: "01a06165-9168-700b-bfd1-8648f339883b",
  type: "page-type/temper-collectible-category",
  slug: "fragments-roseblood-bat",
  title: "Roseblood Bat",
  parent: "temper-collectible-category/fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
