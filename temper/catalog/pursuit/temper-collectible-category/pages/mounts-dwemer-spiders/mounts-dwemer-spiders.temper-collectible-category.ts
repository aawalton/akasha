import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsDwemerSpiders = {
  id: "01a06165-9169-700e-bc03-12f9abcb73d1",
  type: "page-type/temper-collectible-category",
  slug: "mounts-dwemer-spiders",
  title: "Dwemer Spiders",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
