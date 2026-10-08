import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fishermansJournal = {
  id: "01a0d5f6-45ad-7e98-8807-614dc2254911",
  type: "page-type/temper-lore-book",
  slug: "fishermans-journal",
  title: "Fisherman's Journal",
  collection: "temper-lore-collection/final-words",
  esoBookId: 2104,
  bookIndex: 58,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:28:01.837Z",
  updatedAt: "2026-09-25T00:28:03.000Z",
} as const satisfies TemperLoreBook
