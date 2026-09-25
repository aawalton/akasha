import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const catFood = {
  id: "01a0d60b-2344-72ef-b238-335e1669e703",
  type: "page-type/temper-lore-book",
  slug: "cat-food",
  title: "Cat Food",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5670,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
