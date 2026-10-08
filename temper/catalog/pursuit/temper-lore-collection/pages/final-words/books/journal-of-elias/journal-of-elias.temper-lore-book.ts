import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfElias = {
  id: "01a0d5f6-45ad-7a8e-a869-e2c1a4eded7b",
  type: "page-type/temper-lore-book",
  slug: "journal-of-elias",
  title: "Journal of Elias",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1631,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:28:01.837Z",
  updatedAt: "2026-09-25T00:28:03.000Z",
} as const satisfies TemperLoreBook
