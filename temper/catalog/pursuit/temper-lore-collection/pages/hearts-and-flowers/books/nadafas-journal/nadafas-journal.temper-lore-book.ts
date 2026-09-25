import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nadafasJournal = {
  id: "01a0d5f2-af70-7b9c-b3b4-bdf3731cc114",
  type: "page-type/temper-lore-book",
  slug: "nadafas-journal",
  title: "Nadafa's Journal",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1788,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
