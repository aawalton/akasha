import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const fragmentsPassionsMuse = {
  id: "01a06165-9168-7007-b493-10c30cf45ee4",
  type: "page-type/temper-collectible-category",
  slug: "fragments-passions-muse",
  title: "Passion's Muse",
  parent: "temper-collectible-category/fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
