import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const weaponStylesTwoHanded = {
  id: "01a06165-916b-7003-bb26-cd24cd98f7f9",
  type: "page-type/temper-collectible-category",
  slug: "weapon-styles-two-handed",
  title: "Two-Handed",
  parent: "temper-collectible-category/weapon-styles",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
