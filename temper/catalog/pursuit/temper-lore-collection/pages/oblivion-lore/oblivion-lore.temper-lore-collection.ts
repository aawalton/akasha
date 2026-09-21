import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const oblivionLore = {
  id: "01a06343-f9fa-70b6-b07b-0d499ec439ba",
  type: "page-type/temper-lore-collection",
  slug: "oblivion-lore",
  title: "Oblivion Lore",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 17,
  books: "jsonl",
} as const satisfies TemperLoreCollection
