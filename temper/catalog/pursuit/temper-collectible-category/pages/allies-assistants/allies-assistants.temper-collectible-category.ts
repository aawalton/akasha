import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const alliesAssistants = {
  id: "01a06165-9164-7000-a99e-b88a63eb9f48",
  type: "page-type/temper-collectible-category",
  slug: "allies-assistants",
  title: "Assistants",
  parent: "temper-collectible-category/allies",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
