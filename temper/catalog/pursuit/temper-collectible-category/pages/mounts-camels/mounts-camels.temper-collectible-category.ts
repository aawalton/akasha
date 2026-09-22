import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsCamels = {
  id: "01a06165-9169-700b-85b4-7a047906c0f2",
  type: "page-type/temper-collectible-category",
  slug: "mounts-camels",
  title: "Camels",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
