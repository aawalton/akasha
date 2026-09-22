import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const storiesZoneDlc = {
  id: "01a06165-916a-7014-877e-133970ff8925",
  type: "page-type/temper-collectible-category",
  slug: "stories-zone-dlc",
  title: "Zone DLC",
  parent: "temper-collectible-category/stories",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
