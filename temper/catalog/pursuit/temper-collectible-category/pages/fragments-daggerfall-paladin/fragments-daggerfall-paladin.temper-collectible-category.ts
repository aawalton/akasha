import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const fragmentsDaggerfallPaladin = {
  id: "01a06165-9167-700d-a13c-f6686358129b",
  type: "page-type/temper-collectible-category",
  slug: "fragments-daggerfall-paladin",
  title: "Daggerfall Paladin",
  parent: "temper-collectible-category/fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
