import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const fragmentsPlanemeldsMaster = {
  id: "01a06165-9168-7008-a71c-6696c2b03016",
  type: "page-type/temper-collectible-category",
  slug: "fragments-planemelds-master",
  title: "Planemeld's Master",
  parent: "temper-collectible-category/fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
