import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsBigCats = {
  id: "01a06165-9169-7009-93c5-2fc31ab1717b",
  type: "page-type/temper-collectible-category",
  slug: "mounts-big-cats",
  title: "Big Cats",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
