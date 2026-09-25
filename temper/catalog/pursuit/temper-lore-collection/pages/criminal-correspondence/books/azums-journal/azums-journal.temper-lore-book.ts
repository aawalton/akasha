import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const azumsJournal = {
  id: "01a0d5f1-f450-7247-b069-36542f66e48a",
  type: "page-type/temper-lore-book",
  slug: "azums-journal",
  title: "Azum's Journal",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1446,
  bookIndex: 51,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
