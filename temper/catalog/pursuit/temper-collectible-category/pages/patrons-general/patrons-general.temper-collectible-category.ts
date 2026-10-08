import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const patronsGeneral = {
  id: "01a06165-916a-7011-98fb-5ee37e0f812a",
  type: "page-type/temper-collectible-category",
  slug: "patrons-general",
  title: "General",
  parent: "temper-collectible-category/patrons",
  collectibles: "jsonl",
  createdAt: "2026-09-02T09:14:01.450Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperCollectibleCategory
