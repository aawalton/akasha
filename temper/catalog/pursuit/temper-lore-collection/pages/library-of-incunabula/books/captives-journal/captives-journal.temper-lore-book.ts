import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captivesJournal = {
  id: "01a0d5f8-02f8-7620-b3c9-38887743baac",
  type: "page-type/temper-lore-book",
  slug: "captives-journal",
  title: "Captive's Journal",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 3713,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
