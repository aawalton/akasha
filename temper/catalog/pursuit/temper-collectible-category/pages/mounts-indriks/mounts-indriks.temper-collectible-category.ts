import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsIndriks = {
  id: "01a06165-9169-7012-9290-ee7619d682ee",
  type: "page-type/temper-collectible-category",
  slug: "mounts-indriks",
  title: "Indriks",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
