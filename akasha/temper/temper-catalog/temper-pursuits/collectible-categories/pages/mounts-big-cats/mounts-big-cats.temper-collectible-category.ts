import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const mountsBigCats = {
  id: "01a06165-9169-7009-93c5-2fc31ab1717b",
  pageTypeSlug: "temper-collectible-category",
  slug: "mounts-big-cats",
  title: "Big Cats",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
