import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsBrekkas = {
  id: "01a06165-9169-700a-97da-4b65cef2e067",
  type: "page-type/temper-collectible-category",
  slug: "mounts-brekkas",
  title: "Brekkas",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
