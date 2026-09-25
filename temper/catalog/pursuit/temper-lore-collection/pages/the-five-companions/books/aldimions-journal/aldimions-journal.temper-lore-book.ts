import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aldimionsJournal = {
  id: "01a0d5f5-c96e-7c2f-845b-5bbf6529f086",
  type: "page-type/temper-lore-book",
  slug: "aldimions-journal",
  title: "Aldimion's Journal",
  collection: "temper-lore-collection/the-five-companions",
  esoBookId: 2083,
  bookIndex: 18,
  charted: true,
  quest: 4552,
  positions: "jsonl",
} as const satisfies TemperLoreBook
