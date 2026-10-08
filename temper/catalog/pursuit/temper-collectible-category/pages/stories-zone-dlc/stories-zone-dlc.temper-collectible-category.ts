import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const storiesZoneDlc = {
  id: "01a06165-916a-7014-877e-133970ff8925",
  type: "page-type/temper-collectible-category",
  slug: "stories-zone-dlc",
  title: "Zone DLC",
  parent: "temper-collectible-category/stories",
  collectibles: "jsonl",
  createdAt: "2026-09-02T09:14:01.450Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperCollectibleCategory
