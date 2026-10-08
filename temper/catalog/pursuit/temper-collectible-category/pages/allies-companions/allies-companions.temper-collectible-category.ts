import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const alliesCompanions = {
  id: "01a06165-9164-7001-8025-00652c475341",
  type: "page-type/temper-collectible-category",
  slug: "allies-companions",
  title: "Companions",
  parent: "temper-collectible-category/allies",
  collectibles: "jsonl",
  createdAt: "2026-09-02T09:14:01.444Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperCollectibleCategory
