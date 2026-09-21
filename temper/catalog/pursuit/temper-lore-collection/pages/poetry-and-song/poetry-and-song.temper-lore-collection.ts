import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"

export const poetryAndSong = {
  id: "01a06343-f9fa-70c1-b215-a36990c43090",
  type: "page-type/temper-lore-collection",
  slug: "poetry-and-song",
  title: "Poetry and Song",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 18,
  books: "jsonl",
} as const satisfies TemperLoreCollection
