import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ruuvitarsJournal = {
  id: "01a0d5f5-1385-7c72-8b75-2d47b82b0e07",
  type: "page-type/temper-lore-book",
  slug: "ruuvitars-journal",
  title: "Ruuvitar's Journal",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 69,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:26:43.461Z",
  updatedAt: "2026-09-25T00:26:45.000Z",
} as const satisfies TemperLoreBook
