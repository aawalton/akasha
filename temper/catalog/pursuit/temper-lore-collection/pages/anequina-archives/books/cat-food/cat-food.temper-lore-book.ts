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
  createdAt: "2026-09-25T00:50:49.284Z",
  updatedAt: "2026-09-25T00:50:51.000Z",
} as const satisfies TemperLoreBook
