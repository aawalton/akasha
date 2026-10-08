import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sondivelsJournal = {
  id: "01a0d60c-eb9c-7a87-9054-a6d7db57d708",
  type: "page-type/temper-lore-book",
  slug: "sondivels-journal",
  title: "Sondivel's Journal",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7582,
  bookIndex: 76,
  charted: true,
  quest: 7018,
  positions: "jsonl",
  createdAt: "2026-09-25T00:52:46.108Z",
  updatedAt: "2026-09-25T00:52:48.000Z",
} as const satisfies TemperLoreBook
