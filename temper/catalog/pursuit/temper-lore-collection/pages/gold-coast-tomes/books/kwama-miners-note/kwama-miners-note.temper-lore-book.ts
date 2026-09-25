import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kwamaMinersNote = {
  id: "01a0d5f7-73fa-734f-a139-818a8cc75c10",
  type: "page-type/temper-lore-book",
  slug: "kwama-miners-note",
  title: "Kwama Miner's Note",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3721,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
