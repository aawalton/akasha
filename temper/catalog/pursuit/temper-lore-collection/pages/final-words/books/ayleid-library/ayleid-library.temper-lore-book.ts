import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ayleidLibrary = {
  id: "01a0d5f6-45ad-77b9-a549-fff866f5309d",
  type: "page-type/temper-lore-book",
  slug: "ayleid-library",
  title: "Ayleid Library?",
  collection: "temper-lore-collection/final-words",
  esoBookId: 303,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:28:01.837Z",
  updatedAt: "2026-09-25T00:28:03.000Z",
} as const satisfies TemperLoreBook
