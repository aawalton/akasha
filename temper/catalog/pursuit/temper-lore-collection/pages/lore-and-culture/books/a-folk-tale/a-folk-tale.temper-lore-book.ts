import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aFolkTale = {
  id: "01a0d5f3-3fd9-7434-9fa6-7bd7b376172a",
  type: "page-type/temper-lore-book",
  slug: "a-folk-tale",
  title: "A Folk Tale",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 2542,
  bookIndex: 92,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
