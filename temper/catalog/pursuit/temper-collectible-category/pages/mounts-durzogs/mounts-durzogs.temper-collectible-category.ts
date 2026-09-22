import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsDurzogs = {
  id: "01a06165-9169-700d-b36e-c7a718ef623e",
  type: "page-type/temper-collectible-category",
  slug: "mounts-durzogs",
  title: "Durzogs",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
