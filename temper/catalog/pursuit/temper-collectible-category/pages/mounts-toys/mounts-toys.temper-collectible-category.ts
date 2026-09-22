import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsToys = {
  id: "01a06165-916a-7004-a6c7-ee329c2213d9",
  type: "page-type/temper-collectible-category",
  slug: "mounts-toys",
  title: "Toys",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
