import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const curnardsJournal = {
  id: "01a0d5f1-f450-7932-a6ff-ed88c10b3cf4",
  type: "page-type/temper-lore-book",
  slug: "curnards-journal",
  title: "Curnard's Journal",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1846,
  bookIndex: 72,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
