import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsElephants = {
  id: "01a06165-9169-700f-8c28-94aeab9d0be6",
  type: "page-type/temper-collectible-category",
  slug: "mounts-elephants",
  title: "Elephants",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
