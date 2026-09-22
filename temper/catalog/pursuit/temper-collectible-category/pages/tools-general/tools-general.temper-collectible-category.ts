import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const toolsGeneral = {
  id: "01a06165-916a-7016-99c2-e67b1f072fd6",
  type: "page-type/temper-collectible-category",
  slug: "tools-general",
  title: "General",
  parent: "temper-collectible-category/tools",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
