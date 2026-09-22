import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsSencheRaht = {
  id: "01a06165-916a-7001-ade1-e66bb1885c14",
  type: "page-type/temper-collectible-category",
  slug: "mounts-senche-raht",
  title: "Senche-Raht",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
