import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const drusillasNotes = {
  id: "01a0d5f2-253a-73d8-b14d-7aebf5666aee",
  type: "page-type/temper-lore-book",
  slug: "drusillas-notes",
  title: "Drusilla's Notes",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1347,
  bookIndex: 53,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
