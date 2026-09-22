import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const furnishingsUndauntedBusts = {
  id: "01a06165-9168-701f-8818-ddb87aabc647",
  type: "page-type/temper-collectible-category",
  slug: "furnishings-undaunted-busts",
  title: "Undaunted Busts",
  parent: "temper-collectible-category/furnishings",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
