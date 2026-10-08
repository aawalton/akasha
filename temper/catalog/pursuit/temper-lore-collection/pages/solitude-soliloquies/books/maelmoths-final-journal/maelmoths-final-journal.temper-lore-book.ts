import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const maelmothsFinalJournal = {
  id: "01a0d60b-8108-7d43-856f-c7161c44e142",
  type: "page-type/temper-lore-book",
  slug: "maelmoths-final-journal",
  title: "Maelmoth's Final Journal",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6008,
  bookIndex: 66,
  charted: true,
  quest: 6510,
  positions: "jsonl",
  createdAt: "2026-09-25T00:51:13.288Z",
  updatedAt: "2026-09-25T00:51:15.000Z",
} as const satisfies TemperLoreBook
