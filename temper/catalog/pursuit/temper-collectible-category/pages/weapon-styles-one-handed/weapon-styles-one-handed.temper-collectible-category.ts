import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const weaponStylesOneHanded = {
  id: "01a06165-916b-7000-8806-eb3bc1ab4951",
  type: "page-type/temper-collectible-category",
  slug: "weapon-styles-one-handed",
  title: "One-Handed",
  parent: "temper-collectible-category/weapon-styles",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
