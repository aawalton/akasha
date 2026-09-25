import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const myKwamaJournal = {
  id: "01a0d5f5-1385-7b7a-b14a-b5389729a8cd",
  type: "page-type/temper-lore-book",
  slug: "my-kwama-journal",
  title: "My Kwama Journal",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 115,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
