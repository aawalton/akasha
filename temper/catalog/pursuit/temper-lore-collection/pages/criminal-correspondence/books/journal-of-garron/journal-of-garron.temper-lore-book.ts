import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfGarron = {
  id: "01a0d5f1-f451-7993-8b9e-11a27665b2b9",
  type: "page-type/temper-lore-book",
  slug: "journal-of-garron",
  title: "Journal of Garron",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1832,
  bookIndex: 70,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
