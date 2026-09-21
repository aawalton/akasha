import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const magicAndMagicka = {
  id: "01a06343-f9fa-70a0-9229-2208e9020b0a",
  type: "page-type/temper-lore-collection",
  slug: "magic-and-magicka",
  title: "Magic and Magicka",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 15,
  books: "jsonl",
} as const satisfies TemperLoreCollection
