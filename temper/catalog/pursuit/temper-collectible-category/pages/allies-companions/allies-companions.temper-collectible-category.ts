import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const alliesCompanions = {
  id: "01a06165-9164-7001-8025-00652c475341",
  type: "page-type/temper-collectible-category",
  slug: "allies-companions",
  title: "Companions",
  parent: "temper-collectible-category/allies",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
