import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const zagrughsJournal = {
  id: "01a0d5f6-45ae-7d8a-9d83-6324360fe3f0",
  type: "page-type/temper-lore-book",
  slug: "zagrughs-journal",
  title: "Zagrugh's Journal",
  collection: "temper-lore-collection/final-words",
  esoBookId: 2992,
  bookIndex: 76,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
