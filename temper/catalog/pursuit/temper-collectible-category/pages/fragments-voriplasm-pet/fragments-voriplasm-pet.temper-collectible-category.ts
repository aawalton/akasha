import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const fragmentsVoriplasmPet = {
  id: "01a06165-9168-7018-98da-b30fd8d4c3f4",
  type: "page-type/temper-collectible-category",
  slug: "fragments-voriplasm-pet",
  title: "Voriplasm Pet",
  parent: "temper-collectible-category/fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
