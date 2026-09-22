import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsWelwas = {
  id: "01a06165-916a-7007-8631-0bcc6d3dc80a",
  type: "page-type/temper-collectible-category",
  slug: "mounts-welwas",
  title: "Welwas",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
