import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsTharrikers = {
  id: "01a06165-916a-7003-86d9-2fa208fc8a2b",
  type: "page-type/temper-collectible-category",
  slug: "mounts-tharrikers",
  title: "Tharrikers",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
