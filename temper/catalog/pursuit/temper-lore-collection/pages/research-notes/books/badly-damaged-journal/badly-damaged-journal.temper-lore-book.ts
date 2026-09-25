import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const badlyDamagedJournal = {
  id: "01a0d5f5-1383-7363-bde7-6cd6b77932c0",
  type: "page-type/temper-lore-book",
  slug: "badly-damaged-journal",
  title: "Badly Damaged Journal",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1349,
  bookIndex: 53,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
