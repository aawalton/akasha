import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsHorses = {
  id: "01a06165-9169-7011-9a6f-715a034d1287",
  type: "page-type/temper-collectible-category",
  slug: "mounts-horses",
  title: "Horses",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
