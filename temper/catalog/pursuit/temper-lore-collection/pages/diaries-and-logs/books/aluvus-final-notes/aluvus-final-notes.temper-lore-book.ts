import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aluvusFinalNotes = {
  id: "01a0d5f2-509e-7168-8cc9-9035a8407757",
  type: "page-type/temper-lore-book",
  slug: "aluvus-final-notes",
  title: "Aluvus' Final Notes",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 704,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
